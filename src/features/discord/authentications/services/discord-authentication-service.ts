import _ from "lodash";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk-service";
import { LoggerService } from "../../../logger/services/logger-service";
import { DiscordClientService } from "../../services/discord-client-service";
import { DiscordSoniaConfigService } from "../../users/services/discord-sonia-config-service";

export class DiscordAuthenticationService {
  private static _instance: DiscordAuthenticationService;

  public static getInstance(): DiscordAuthenticationService {
    if (_.isNil(DiscordAuthenticationService._instance)) {
      DiscordAuthenticationService._instance = new DiscordAuthenticationService();
    }

    return DiscordAuthenticationService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _discordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordAuthenticationService`;

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
    this._login();
  }

  private _listen(): void {
    this._discordClientServiceClient.on(`ready`, (): void => {
      this._handleReady();
    });

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`listen ${wrapInQuotes(`ready`)} event`),
    });
  }

  private _handleReady(): void {
    if (!_.isNil(this._discordClientServiceClient.user)) {
      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(
          `authenticated as: ${this._chalkService.value(
            wrapInQuotes(this._discordClientServiceClient.user.tag)
          )}`
        ),
      });
    } else {
      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(
          `authenticated as: ${this._chalkService.value(`unknown user`)}`
        ),
      });
    }
  }

  private _login(): void {
    this._discordClientServiceClient
      .login(this._discordSoniaConfigService.getSecretToken())
      .then((): void => {
        this._loggerService.success({
          context: this._className,
          message: this._chalkService.text(`authentication successful`),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._className,
          message: this._chalkService.text(`authentication failed`),
        });
        this._loggerService.error({
          context: this._className,
          message: this._chalkService.error(error),
        });
      });

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`authenticating...`),
    });
  }
}
