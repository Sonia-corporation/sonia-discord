import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildSoniaService } from "../../guilds/services/discord-guild-sonia.service";
import { DiscordClientService } from "../../services/discord-client.service";

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
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();

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

    setTimeout((): void => {
      this._handleError(`dza`);
    }, 5000);

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
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `send message to Sonia Discord errors channel`
      ),
    });

    this._discordGuildSoniaService.sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
      messageResponse: {
        response: `error`,
      },
    });
  }
}
