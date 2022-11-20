import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { LoggerService } from '../../../../logger/services/logger.service';
import { DiscordGuildSoniaChannelNameEnum } from '../../../guilds/enums/discord-guild-sonia-channel-name.enum';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../config/discord-message-config.service';
import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail,
  Snowflake,
} from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService extends AbstractService {
  private static _instance: DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService;

  public static getInstance(): DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService {
    if (_.isNil(DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService._instance)) {
      DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService._instance =
        new DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService();
    }

    return DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERIFY_CHANNEL_RIGHT_WARNING_UNSUPPORTED_CHANNEL_TYPE_SERVICE);
  }

  public warn(messageId: Snowflake): void {
    LoggerService.getInstance().warning({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(messageId, `unsupported channel type!`),
    });
    DiscordGuildSoniaService.getInstance().sendMessageToChannel({
      channelName: DiscordGuildSoniaChannelNameEnum.WARNINGS,
      messageResponse: this._getWarningMessageResponse(),
    });
  }

  private _getWarningMessageResponse(): IDiscordMessageResponse {
    return {
      options: {
        embeds: [this._getMessageEmbed()],
      },
    };
  }

  private _getMessageEmbed(): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageEmbedDescription(),
      fields: this._getMessageEmbedFields(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle(),
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return DiscordSoniaService.getInstance().getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageConfigService.getInstance().getMessageWarningImageUrl(),
    };
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    return [this._getMessageEmbedFieldReport()];
  }

  private _getMessageEmbedFieldReport(): EmbedFieldData {
    const githubFeatureRequestUrl: string = GithubConfigService.getInstance().getFeatureRequestUrl();

    return {
      name: `Help me to get better!`,
      value: `If you think that using this command on this type of channel should be supported, do not hesitate to submit a [feature request](${githubFeatureRequestUrl}).`,
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `Discord unsupported command channel type`,
    };
  }

  private _getMessageEmbedColor(): number {
    return DiscordMessageConfigService.getInstance().getMessageWarningImageColor();
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Warning!`;
  }

  private _getMessageEmbedDescription(): string {
    return `Your command cannot be processed in this type of channel! I am yet not able to process the commands on such channels!`;
  }
}
