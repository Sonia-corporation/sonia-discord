import _ from "lodash";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk-service";
import { LoggerService } from "../../../logger/services/logger-service";
import { DiscordClientService } from "../../services/discord-client-service";

export class DiscordLoggerService {
  private static _instance: DiscordLoggerService;

  public static getInstance(): DiscordLoggerService {
    if (_.isNil(DiscordLoggerService._instance)) {
      DiscordLoggerService._instance = new DiscordLoggerService();
    }

    return DiscordLoggerService._instance;
  }

  private readonly _discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordLoggerService`;

  public constructor() {
    this.init();
  }

  public init(): void {
    this._listenForWarnings();
    this._listenForErrors();
  }

  private _listenForWarnings(): void {
    this._discordClientServiceClient.on(
      `warn`,
      (message: Readonly<string>): void => {
        this._handleWarn(message);
      }
    );

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`listen ${wrapInQuotes(`warn`)} event`),
    });
  }

  private _handleWarn(message: Readonly<string>): void {
    this._loggerService.warning({
      context: this._className,
      message: this._chalkService.text(message),
    });
  }

  private _listenForErrors(): void {
    this._discordClientServiceClient.on(
      `error`,
      (error: Readonly<Error>): void => {
        this._handleError(error);
      }
    );

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(`listen ${wrapInQuotes(`error`)} event`),
    });
  }

  private _handleError(error: Readonly<Error>): void {
    this._loggerService.error({
      context: this._className,
      message: this._chalkService.text(error),
    });
  }
}
