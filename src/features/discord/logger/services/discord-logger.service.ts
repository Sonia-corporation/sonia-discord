import _ from "lodash";
import { AbstractService } from "../../../../classes/services/abstract.service";
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

  public constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_SERVICE);
  }

  public init(): void {
    this._listenForWarnings();
    this._listenForErrors();
  }

  private _listenForWarnings(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`warn`, (warning: Readonly<string>): void => {
        DiscordLoggerWarningService.getInstance().handleWarning(warning);
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`warn`)} event`
      ),
    });
  }

  private _listenForErrors(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`error`, (error: Readonly<Error | string>): void => {
        DiscordLoggerErrorService.getInstance().handleError(error);
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`error`)} event`
      ),
    });
  }
}
