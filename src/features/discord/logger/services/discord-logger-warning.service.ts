import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildSoniaService } from "../../guilds/services/discord-guild-sonia.service";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordMessageConfigService } from "../../messages/services/config/discord-message-config.service";
import { DiscordSoniaService } from "../../users/services/discord-sonia.service";

export class DiscordLoggerWarningService extends AbstractService {
  private static _instance: DiscordLoggerWarningService;

  public static getInstance(): DiscordLoggerWarningService {
    if (_.isNil(DiscordLoggerWarningService._instance)) {
      DiscordLoggerWarningService._instance = new DiscordLoggerWarningService();
    }

    return DiscordLoggerWarningService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_WARNING_SERVICE);
  }

  public handleWarning(warning: Readonly<string>): void {
    this._loggerService.warning({
      context: this._serviceName,
      message: this._chalkService.text(warning),
    });
    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `send message to Sonia Discord warnings channel`
      ),
    });

    this._discordGuildSoniaService.sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.WARNINGS,
      messageResponse: this._getErrorMessageResponse(warning),
    });
  }

  private _getErrorMessageResponse(
    warning: Readonly<string>
  ): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getMessageEmbed(warning),
        split: true,
      },
      response: ``,
    };
  }

  private _getMessageEmbed(warning: Readonly<string>): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageEmbedDescription(warning),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return this._discordSoniaService.getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: this._discordMessageConfigService.getMessageWarningImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Discord warning`,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageWarningImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Warning!`;
  }

  private _getMessageEmbedDescription(warning: Readonly<string>): string {
    return warning;
  }
}
