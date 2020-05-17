import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { getRandomValueFromEnum } from "../../../../../../functions/randoms/get-random-value-from-enum";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordSoniaService } from "../../../../users/services/discord-sonia.service";
import { DiscordMessageCommandLunchDescriptionEnum } from "../../../enums/command/lunch/discord-message-command-lunch-description.enum";
import { DiscordMessageCommandLunchTitleEnum } from "../../../enums/command/lunch/discord-message-command-lunch-title.enum";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";

export class DiscordMessageCommandLunchService extends AbstractService {
  private static _instance: DiscordMessageCommandLunchService;

  public static getInstance(): DiscordMessageCommandLunchService {
    if (_.isNil(DiscordMessageCommandLunchService._instance)) {
      DiscordMessageCommandLunchService._instance = new DiscordMessageCommandLunchService();
    }

    return DiscordMessageCommandLunchService._instance;
  }

  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordSoniaService: DiscordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_LUNCH_SERVICE);
  }

  public handleResponse(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._serviceName,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `lunch command detected`
      ),
    });

    return this.getMessageResponse();
  }

  public getMessageResponse(): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getMessageEmbed(),
        split: true,
      },
      response: ``,
    };
  }

  private _getMessageEmbed(): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageDescription(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return this._discordSoniaService.getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandLunchImageColor();
  }

  private _getMessageDescription(): string {
    return (
      getRandomValueFromEnum(DiscordMessageCommandLunchDescriptionEnum) ||
      `Cool.`
    );
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Bon appétit`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: this._discordMessageConfigService.getMessageCommandLunchImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return (
      getRandomValueFromEnum(DiscordMessageCommandLunchTitleEnum) ||
      `Lunch time!`
    );
  }
}
