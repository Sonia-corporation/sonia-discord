import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordLoggerErrorService } from "./discord-logger-error.service";

export class DiscordLoggerService extends AbstractService {
  private static _instance: DiscordLoggerService;

  public static getInstance(): DiscordLoggerService {
    if (_.isNil(DiscordLoggerService._instance)) {
      DiscordLoggerService._instance = new DiscordLoggerService();
    }

    return DiscordLoggerService._instance;
  }

  public readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _discordLoggerErrorService: DiscordLoggerErrorService = DiscordLoggerErrorService.getInstance();

  protected constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_SERVICE);
    this.init();
  }

  public init(): void {
    this._listenForWarnings();
    this._listenForErrors();
  }

  private _listenForWarnings(): void {
    this.discordClient.on(`warn`, (message: Readonly<string>): void => {
      this._handleWarn(message);
    });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`warn`)} event`),
    });
  }

  private _handleWarn(message: Readonly<string>): void {
    this._loggerService.warning({
      context: this._serviceName,
      message: this._chalkService.text(message),
    });
  }

  private _listenForErrors(): void {
    this.discordClient.on(`error`, (error: Readonly<Error>): void => {
      this._discordLoggerErrorService.handleError(error);
    });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`error`)} event`),
    });
  }
}
