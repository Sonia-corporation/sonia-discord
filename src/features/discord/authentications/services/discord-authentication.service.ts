import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
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

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordSoniaConfigService: DiscordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_AUTHENTICATION_SERVICE);
  }

  public init(): void {
    this._listen();
    this.login();
  }

  public login(): void {
    this._discordClientService
      .getClient()
      .login(this._discordSoniaConfigService.getSecretToken())
      .then((): void => {
        this._loggerService.success({
          context: this._serviceName,
          message: this._chalkService.text(`authentication successful`),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.text(`authentication failed`),
        });
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.error(error),
        });
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`authenticating...`),
    });
  }

  private _listen(): void {
    this._discordClientService.getClient().on(`ready`, (): void => {
      this._handleReady();
    });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`ready`)} event`),
    });
  }

  private _handleReady(): void {
    this._logWhenReady();
    this._updateReadyState();
  }

  private _logWhenReady(): void {
    const client: Client = this._discordClientService.getClient();

    if (!_.isNil(client.user)) {
      this._loggerService.log({
        context: this._serviceName,
        message: this._chalkService.text(
          `authenticated as: ${this._chalkService.value(
            wrapInQuotes(client.user.tag)
          )}`
        ),
      });
    } else {
      this._loggerService.log({
        context: this._serviceName,
        message: this._chalkService.text(
          `authenticated as: ${this._chalkService.value(`unknown user`)}`
        ),
      });
    }
  }

  private _updateReadyState(): void {
    this._discordClientService.notifyIsReady();
  }
}
