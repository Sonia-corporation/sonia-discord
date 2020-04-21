import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../classes/enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { DiscordClientService } from "../../services/discord-client.service";

export class DiscordLoggerService extends AbstractService {
  private static _instance: DiscordLoggerService;

  public static getInstance(): DiscordLoggerService {
    if (_.isNil(DiscordLoggerService._instance)) {
      DiscordLoggerService._instance = new DiscordLoggerService();
    }

    return DiscordLoggerService._instance;
  }

  private readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

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
      this._handleError(error);
    });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`error`)} event`),
    });
  }

  private _handleError(error: Readonly<Error>): void {
    this._loggerService.error({
      context: this._serviceName,
      message: this._chalkService.text(error),
    });
  }
}
