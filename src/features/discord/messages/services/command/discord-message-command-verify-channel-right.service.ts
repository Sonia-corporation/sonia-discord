import { DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService } from './discord-message-command-verify-channel-right-warning-unsupported-channel-type.service';
import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
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
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageCommandVerifyChannelRightService extends AbstractService {
  private static _instance: DiscordMessageCommandVerifyChannelRightService;

  public static getInstance(): DiscordMessageCommandVerifyChannelRightService {
    if (_.isNil(DiscordMessageCommandVerifyChannelRightService._instance)) {
      DiscordMessageCommandVerifyChannelRightService._instance = new DiscordMessageCommandVerifyChannelRightService();
    }

    return DiscordMessageCommandVerifyChannelRightService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERIFY_CHANNEL_RIGHT_SERVICE);
  }

  public verify({ channel, id }: IAnyDiscordMessage, allowedChannels: Set<DiscordChannelEnum>): boolean {
    if (isDiscordDmChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.DM);
    }

    if (isDiscordTextChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.TEXT);
    }

    if (isDiscordThreadChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.THREAD);
    }

    if (isDiscordNewsChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.NEWS);
    }

    if (isDiscordCategoryChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.CATEGORY);
    }

    if (isDiscordStageChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.STAGE);
    }

    if (isDiscordVoiceChannel(channel)) {
      return allowedChannels.has(DiscordChannelEnum.VOICE);
    }

    DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService.getInstance().warn(id);

    return false;
  }

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

  private _getMessageEmbed(
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

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageCommandErrorImageColor();
  }

  private _getMessageEmbedFields(
    anyDiscordMessage: IAnyDiscordMessage,
    allowedChannels: Set<DiscordChannelEnum>
  ): EmbedFieldData[] {
    return [
      this._getMessageEmbedFieldWrongChannel(anyDiscordMessage),
      this._getMessageEmbedFieldHint(allowedChannels),
      this._getMessageEmbedFieldReport(anyDiscordMessage),
    ];
  }

  private _getMessageEmbedFieldWrongChannel({ channel }: IAnyDiscordMessage): EmbedFieldData {
    return {
      name: `Wrong channel!`,
      value: `This command is not allowed on ${getDiscordHumanizedChannelPluralFromClass(channel)}.`,
    };
  }

  private _getMessageEmbedFieldHint(allowedChannels: Set<DiscordChannelEnum>): EmbedFieldData {
    return {
      name: `Allowed channels`,
      value: `You can use this command only on ${getDiscordHumanizedChannelsPlural(Array.from(allowedChannels))}.`,
    };
  }

  private _getMessageEmbedFieldReport({ channel }: IAnyDiscordMessage): EmbedFieldData {
    const githubFeatureRequestUrl: string = GithubConfigService.getInstance().getFeatureRequestUrl();

    return {
      name: `Help me to get better!`,
      value: `If you think that using this command on ${getDiscordHumanizedChannelPluralFromClass(
        channel
      )} should be allowed, do not hesitate to submit a [feature request](${githubFeatureRequestUrl}).`,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `I don't allow you!`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageCommandErrorImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `I cannot let you do that!`;
  }
}
