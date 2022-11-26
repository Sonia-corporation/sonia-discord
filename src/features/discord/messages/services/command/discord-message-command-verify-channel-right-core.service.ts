import { AbstractService } from '../../../../../classes/services/abstract.service';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { DiscordChannelEnum } from '../../../channels/enums/discord-channel.enum';
import { getDiscordHumanizedChannelPluralFromClass } from '../../../channels/functions/get-discord-humanized-channel-plural-from-class';
import { getDiscordHumanizedChannelsPlural } from '../../../channels/functions/get-discord-humanized-channels-plural';
import { isDiscordCategoryChannel } from '../../../channels/functions/is-discord-category-channel';
import { isDiscordDmChannel } from '../../../channels/functions/is-discord-dm-channel';
import { isDiscordNewsChannel } from '../../../channels/functions/is-discord-news-channel';
import { isDiscordStageChannel } from '../../../channels/functions/is-discord-stage-channel';
import { isDiscordTextChannel } from '../../../channels/functions/is-discord-text-channel';
import { isDiscordThreadChannel } from '../../../channels/functions/is-discord-thread-channel';
import { isDiscordVoiceChannel } from '../../../channels/functions/is-discord-voice-channel';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
} from 'discord.js';
import moment from 'moment-timezone';

export abstract class DiscordMessageCommandVerifyChannelRightCoreService extends AbstractService {
  /**
   * @description
   * Check if the given message channel is allowed to execute the sub-command related to the message.
   * @param   {IAnyDiscordMessage}      message         The message that trigger a sub-command.
   * @param   {Set<DiscordChannelEnum>} allowedChannels A list of channels allowed to execute the related sub-command.
   * @returns {boolean | undefined}                     Return true when the sub-command related to the message can be executed.
   */
  public verify(message: IAnyDiscordMessage, allowedChannels: Set<DiscordChannelEnum>): boolean | undefined {
    if (isDiscordDmChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.DM);
    }

    if (isDiscordTextChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.TEXT);
    }

    if (isDiscordThreadChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.THREAD);
    }

    if (isDiscordNewsChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.NEWS);
    }

    if (isDiscordCategoryChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.CATEGORY);
    }

    if (isDiscordStageChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.STAGE);
    }

    if (isDiscordVoiceChannel(message.channel)) {
      return allowedChannels.has(DiscordChannelEnum.VOICE);
    }

    return undefined;
  }

  /**
   * @description
   * Get an error message response to explain why the sub-command cannot be executed on this channel type.
   * @param   {IAnyDiscordMessage}               anyDiscordMessage The message that trigger a sub-command.
   * @param   {Set<DiscordChannelEnum>}          allowedChannels   A list of channels allowed to execute the related sub-command.
   * @returns {Promise<IDiscordMessageResponse>}                   Return an error message response to explain why the sub-command is not allowed.
   */
  public getErrorMessageResponse(
    anyDiscordMessage: IAnyDiscordMessage,
    allowedChannels: Set<DiscordChannelEnum>
  ): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      options: {
        embeds: [this._getMessageEmbed(anyDiscordMessage, allowedChannels)],
      },
    };

    return Promise.resolve(message);
  }

  protected _getMessageEmbed(
    anyDiscordMessage: IAnyDiscordMessage,
    allowedChannels: Set<DiscordChannelEnum>
  ): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      fields: this._getMessageEmbedFields(anyDiscordMessage, allowedChannels),
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

  protected _getMessageEmbedFields(
    anyDiscordMessage: IAnyDiscordMessage,
    allowedChannels: Set<DiscordChannelEnum>
  ): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldWrongChannel(anyDiscordMessage),
      this._getMessageEmbedFieldHint(allowedChannels),
      this._getMessageEmbedFieldReport(anyDiscordMessage),
    ];
  }

  protected _getMessageEmbedFieldWrongChannel({ channel }: IAnyDiscordMessage): EmbedFieldData {
    return {
      name: `Wrong channel!`,
      value: `This sub-command is not allowed on ${getDiscordHumanizedChannelPluralFromClass(channel)}.`,
    };
  }

  protected _getMessageEmbedFieldHint(allowedChannels: Set<DiscordChannelEnum>): EmbedFieldData {
    return {
      name: `Allowed channels`,
      value: `You can use this sub-command only on ${getDiscordHumanizedChannelsPlural(Array.from(allowedChannels))}.`,
    };
  }

  protected _getMessageEmbedFieldReport({ channel }: IAnyDiscordMessage): EmbedFieldData {
    const githubFeatureRequestUrl: string = GithubConfigService.getInstance().getFeatureRequestUrl();

    return {
      name: `Help me to get better!`,
      value: `If you think that using this sub-command on ${getDiscordHumanizedChannelPluralFromClass(
        channel
      )} should be allowed, do not hesitate to submit a [feature request](${githubFeatureRequestUrl}).`,
    };
  }

  protected _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `I don't allow you!`,
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
    return `I cannot let you do that!`;
  }
}
