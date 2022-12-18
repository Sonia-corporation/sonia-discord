import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { APIEmbed, APIEmbedAuthor, APIEmbedFooter, APIEmbedImage } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageHelpService extends AbstractService {
  private static _instance: DiscordMessageHelpService;

  public static getInstance(): DiscordMessageHelpService {
    if (_.isNil(DiscordMessageHelpService._instance)) {
      DiscordMessageHelpService._instance = new DiscordMessageHelpService();
    }

    return DiscordMessageHelpService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_HELP_SERVICE);
  }

  public getMessageResponse(): Promise<IDiscordMessageResponse> {
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
    return DiscordMessageConfigService.getInstance().getMessageCommandHelpImageColor();
  }

  private _getMessageEmbedFooter(): APIEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      icon_url: soniaImageUrl ?? undefined,
      text: `At your service`,
    };
  }

  private _getMessageEmbedThumbnail(): APIEmbedImage {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandHelpImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): string {
    return moment().toISOString();
  }
}
