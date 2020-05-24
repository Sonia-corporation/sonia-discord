import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordLoggerErrorService } from "./discord-logger-error.service";
import { DiscordLoggerWarningService } from "./discord-logger-warning.service";

export class DiscordLoggerService extends AbstractService {
  private static _instance: DiscordLoggerService;

  public static getInstance(): DiscordLoggerService {
    if (_.isNil(DiscordLoggerService._instance)) {
      DiscordLoggerService._instance = new DiscordLoggerService();
    }

    return DiscordLoggerService._instance;
  }

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _discordLoggerErrorService: DiscordLoggerErrorService = DiscordLoggerErrorService.getInstance();
  private readonly _discordLoggerWarningService: DiscordLoggerWarningService = DiscordLoggerWarningService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_SERVICE);
  }

  public init(): void {
    this._listenForWarnings();
    this._listenForErrors();
  }

  private _listenForWarnings(): void {
    this._discordClientService
      .getClient()
      .on(`warn`, (warning: Readonly<string>): void => {
        this._discordLoggerWarningService.handleWarning(warning);
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`warn`)} event`),
    });
  }

  private _listenForErrors(): void {
    this._discordClientService
      .getClient()
      .on(`error`, (error: Readonly<Error | string>): void => {
        this._discordLoggerErrorService.handleError(error);
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`error`)} event`),
    });
  }
}
