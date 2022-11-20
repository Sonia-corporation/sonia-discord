import { DiscordMessageScheduleNoonCountHumanizedService } from './discord-message-schedule-noon-count-humanized.service';
import { AbstractService } from '../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { DiscordSoniaService } from '../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { DiscordMessageCommandFeatureNoonConfigService } from '../command/feature/features/noon/services/config/discord-message-command-feature-noon-config.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedOptions, MessageEmbedThumbnail } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class DiscordMessageScheduleNoonCountMessageResponseService extends AbstractService {
  private static _instance: DiscordMessageScheduleNoonCountMessageResponseService;

  public static getInstance(): DiscordMessageScheduleNoonCountMessageResponseService {
    if (_.isNil(DiscordMessageScheduleNoonCountMessageResponseService._instance)) {
      DiscordMessageScheduleNoonCountMessageResponseService._instance =
        new DiscordMessageScheduleNoonCountMessageResponseService();
    }

    return DiscordMessageScheduleNoonCountMessageResponseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_MESSAGE_RESPONSE_SERVICE);
  }

  public getMessageResponse(
    totalGuildCount: number,
    guildCount: number,
    channelCount: number
  ): IDiscordMessageResponse {
    return {
      options: {
        embeds: [this._getMessageEmbed(totalGuildCount, guildCount, channelCount)],
      },
    };
  }

  private _getMessageEmbed(totalGuildCount: number, guildCount: number, channelCount: number): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageEmbedDescription(totalGuildCount, guildCount, channelCount),
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
    return DiscordMessageCommandFeatureNoonConfigService.getInstance().getNoonConfigImageColor();
  }

  private _getMessageEmbedDescription(totalGuildCount: number, guildCount: number, channelCount: number): string {
    return DiscordMessageScheduleNoonCountHumanizedService.getInstance().getHumanizedCount(
      totalGuildCount,
      guildCount,
      channelCount
    );
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = DiscordSoniaService.getInstance().getImageUrl();

    return {
      iconURL: soniaImageUrl ?? undefined,
      text: `Sonia reporter out`,
    };
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    return {
      url: DiscordMessageCommandFeatureNoonConfigService.getInstance().getNoonConfigImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Noon report`;
  }
}
