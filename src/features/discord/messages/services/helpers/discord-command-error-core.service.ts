import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedOptions, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';

/**
 * @description
 * Service in common for other error services.
 * Used to avoid code duplication.
 */
export abstract class DiscordCommandErrorCoreService extends AbstractService {
  protected constructor(serviceName: ServiceNameEnum) {
    super(serviceName);
  }

  protected _getMessageEmbed(): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  protected _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  protected _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandErrorImageColor();
  }

  protected _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `I am very sorry for that`,
    };
  }

  protected _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageUrl(),
    };
  }

  protected _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  protected _getMessageEmbedTitle(): string {
    return `Oops, something went wrong`;
  }
}
