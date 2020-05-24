import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { ellipsis } from "../../../../functions/formatters/ellipsis";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordGuildSoniaChannelNameEnum } from "../../guilds/enums/discord-guild-sonia-channel-name.enum";
import { DiscordGuildSoniaService } from "../../guilds/services/discord-guild-sonia.service";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordMessageConfigService } from "../../messages/services/config/discord-message-config.service";
import { DiscordSoniaService } from "../../users/services/discord-sonia.service";

export class DiscordLoggerErrorService extends AbstractService {
  private static _instance: DiscordLoggerErrorService;

  public static getInstance(): DiscordLoggerErrorService {
    if (_.isNil(DiscordLoggerErrorService._instance)) {
      DiscordLoggerErrorService._instance = new DiscordLoggerErrorService();
    }

    return DiscordLoggerErrorService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE);
  }

  public handleError(error: Readonly<Error | string>): void {
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
      messageResponse: this.getErrorMessageResponse(error),
    });
  }

  public getErrorMessageResponse(
    error: Readonly<Error | string>
  ): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getMessageEmbed(error),
        split: true,
      },
      response: ``,
    };
  }

  private _getMessageEmbed(
    error: Readonly<Error | string>
  ): MessageEmbedOptions {
    const messageEmbedOptions: MessageEmbedOptions = {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(error),
    };

    if (!_.isString(error)) {
      messageEmbedOptions.description = this._getMessageEmbedDescription(error);
      messageEmbedOptions.fields = this._getMessageEmbedFields(error);
    }

    return messageEmbedOptions;
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return this._discordSoniaService.getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: this._discordMessageConfigService.getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Discord error`,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(error: Readonly<Error | string>): string {
    if (_.isString(error)) {
      return error;
    }

    return error.name;
  }

  private _getMessageEmbedDescription(error: Readonly<Error>): string {
    return error.message;
  }

  private _getMessageEmbedFields(error: Readonly<Error>): EmbedFieldData[] {
    const embedFieldData: EmbedFieldData[] = [];

    if (!_.isNil(error.stack)) {
      embedFieldData.push(this._getMessageEmbedFieldError(error.stack));
    }

    return embedFieldData;
  }

  private _getMessageEmbedFieldError(stack: Readonly<string>): EmbedFieldData {
    return {
      name: `My blood trace`,
      value: ellipsis(stack),
    };
  }
}
