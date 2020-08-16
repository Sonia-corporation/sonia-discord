import {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from "discord.js";
import _ from "lodash";
import moment from "moment-timezone";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { DiscordSoniaService } from "../../../users/services/discord-sonia.service";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";
import { DiscordMessageConfigService } from "../config/discord-message-config.service";

export class DiscordMessageCommandCliErrorService extends AbstractService {
  private static _instance: DiscordMessageCommandCliErrorService;

  public static getInstance(): DiscordMessageCommandCliErrorService {
    if (_.isNil(DiscordMessageCommandCliErrorService._instance)) {
      DiscordMessageCommandCliErrorService._instance = new DiscordMessageCommandCliErrorService();
    }

    return DiscordMessageCommandCliErrorService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_CLI_ERROR_SERVICE);
  }

  /**
   * @description
   * Return the common options for the message
   * You should at least add a title to make it useful
   *
   * @return {IDiscordMessageResponse} A partial Discord message response
   */
  public getCliErrorMessageResponse(): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getCliErrorMessageEmbed(),
        split: true,
      },
      response: ``,
    };
  }

  private _getCliErrorMessageEmbed(): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandCliErrorImageColor();
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl:
      | string
      | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl || undefined,
      text: `Retry with the right argument`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandCliErrorImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }
}
