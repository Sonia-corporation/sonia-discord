import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment";
import { getRandomValueFromEnum } from "../../../../../functions/randoms/get-random-value-from-enum";
import { LoggerService } from "../../../../logger/services/logger-service";
import { DiscordSoniaService } from "../../../users/services/discord-sonia-service";
import { DiscordMessageCommandCookieDescriptionEnum } from "../../enums/command/cookie/discord-message-command-cookie-description.enum";
import { DiscordMessageCommandCookieTitleEnum } from "../../enums/command/cookie/discord-message-command-cookie-title.enum";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../types/any-discord-message";
import { DiscordMessageConfigService } from "../config/discord-message-config-service";

export class DiscordMessageCommandCookieService {
  private static _instance: DiscordMessageCommandCookieService;

  public static getInstance(): DiscordMessageCommandCookieService {
    if (_.isNil(DiscordMessageCommandCookieService._instance)) {
      DiscordMessageCommandCookieService._instance = new DiscordMessageCommandCookieService();
    }

    return DiscordMessageCommandCookieService._instance;
  }

  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _className = `DiscordMessageCommandCookieService`;

  public handle(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `cookie command detected`
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

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: this._discordMessageConfigService.getMessageCommandCookieImageUrl(),
    };
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

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandCookieImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return (
      getRandomValueFromEnum(DiscordMessageCommandCookieTitleEnum) || `Cookies!`
    );
  }

  private _getMessageDescription(): string {
    return (
      getRandomValueFromEnum(DiscordMessageCommandCookieDescriptionEnum) ||
      `Yes.`
    );
  }
}
