import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

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
   * Return the common options for the message.
   * You should at least add a title to make it useful.
   * @returns {IDiscordMessageResponse} A partial Discord message response.
   */
  public getCliErrorMessageResponse(): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      options: {
        embeds: [this._getMessageEmbed()],
      },
    };

    return Promise.resolve(message);
  }

  private _getMessageEmbed(): APIEmbed {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
    };
  }

  private _getMessageEmbedAuthor(): APIEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandCliErrorImageColor();
  }

  private _getMessageEmbedFooter(): APIEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      icon_url: soniaImageUrl ?? undefined,
      text: `Retry with the right argument`,
    };
  }

  private _getMessageEmbedThumbnail(): APIEmbedImage {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandCliErrorImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): string {
    return moment().toISOString();
  }
}
