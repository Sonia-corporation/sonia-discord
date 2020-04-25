import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
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

  public readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordSoniaConfigService: DiscordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_AUTHENTICATION_SERVICE);
    this.init();
  }

  public init(): void {
    this._listen();
    this._login();
  }

  private _listen(): void {
    this.discordClient.on(`ready`, (): void => {
      this._handleReady();
    });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`ready`)} event`),
    });
  }

  private _handleReady(): void {
    if (!_.isNil(this.discordClient.user)) {
      this._loggerService.log({
        context: this._serviceName,
        message: this._chalkService.text(
          `authenticated as: ${this._chalkService.value(
            wrapInQuotes(this.discordClient.user.tag)
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

  private _login(): void {
    this.discordClient
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
}
