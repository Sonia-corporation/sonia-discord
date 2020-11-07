import { Client } from "discord.js";
import _ from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordSoniaConfigService } from "../../users/services/config/discord-sonia-config.service";

export class DiscordAuthenticationService extends AbstractService {
  private static _instance: DiscordAuthenticationService;

  public static getInstance(): DiscordAuthenticationService {
    if (_.isNil(DiscordAuthenticationService._instance)) {
      DiscordAuthenticationService._instance = new DiscordAuthenticationService();
    }

    return DiscordAuthenticationService._instance;
  }

  private readonly _isAuthenticated$: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  public constructor() {
    super(ServiceNameEnum.DISCORD_AUTHENTICATION_SERVICE);
  }

  public init(): Promise<void> {
    this._listen();

    return this.login();
  }

  public login(): Promise<void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`authenticating...`),
    });

    return DiscordClientService.getInstance()
      .getClient()
      .login(DiscordSoniaConfigService.getInstance().getSecretToken())
      .then((): void => {
        LoggerService.getInstance().success({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`authentication successful`),
        });
        this.notifyIsAuthenticated();
      })
      .catch(
        (error: unknown): Promise<void> => {
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(`authentication failed`),
          });
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().error(error),
          });

          return Promise.reject(error);
        }
      );
  }

  public isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  public notifyIsAuthenticated(): void {
    this._isAuthenticated$.next(true);
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`ready`, (): void => {
        this._handleReady();
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`ready`)} event`
      ),
    });
  }

  private _handleReady(): void {
    this._logWhenReady();
    this._updateReadyState();
  }

  private _logWhenReady(): void {
    const client: Client = DiscordClientService.getInstance().getClient();

    if (_.isNil(client.user)) {
      LoggerService.getInstance().log({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `authenticated as: ${ChalkService.getInstance().value(
            `unknown user`
          )}`
        ),
      });

      return;
    }

    LoggerService.getInstance().log({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `authenticated as: ${ChalkService.getInstance().value(
          wrapInQuotes(client.user.tag)
        )}`
      ),
    });
  }

  private _updateReadyState(): void {
    DiscordClientService.getInstance().notifyIsReady();
  }
}
