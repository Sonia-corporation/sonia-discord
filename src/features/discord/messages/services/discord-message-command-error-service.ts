import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment";
import { LoggerService } from "../../../logger/services/logger-service";
import { DiscordSoniaService } from "../../users/services/discord-sonia-service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessageConfigService } from "./config/discord-message-config-service";

export class DiscordMessageCommandErrorService {
  private static _instance: DiscordMessageCommandErrorService;

  public static getInstance(): DiscordMessageCommandErrorService {
    if (_.isNil(DiscordMessageCommandErrorService._instance)) {
      DiscordMessageCommandErrorService._instance = new DiscordMessageCommandErrorService();
    }

    return DiscordMessageCommandErrorService._instance;
  }

  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _className = `DiscordMessageCommandErrorService`;

  public handle(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(
        anyDiscordMessage.id,
        `error command detected`
      ),
    });

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
      fields: this._getMessageEmbedFields(),
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
      url: this._discordMessageConfigService.getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = this._discordSoniaService.getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Nice try little man`,
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Uh-oh. What just happened?`;
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return [this._getMessageEmbedFieldBait(), this._getMessageEmbedFieldHint()];
  }

  private _getMessageEmbedFieldBait(): EmbedFieldData {
    return {
      name: `It seems that something went wrong`,
      value: `You may have found an issue with my internal core system.\n
      Please, inform my creator as soon as possible!\nThis could lead to a very critical failure for myself and I do not wish to die!!`,
    };
  }

  private _getMessageEmbedFieldHint(): EmbedFieldData {
    return {
      name: `Come again?`,
      value: `What do you think you are doing here?\n
      That is not the way it works!\n
      Get back to work you peasant.`,
    };
  }
}
