import { FirebaseGuildsNewVersionCountHumanizedService } from './firebase-guilds-new-version-count-humanized.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from '../../../discord/messages/services/command/feature/features/release-notes/services/config/discord-message-command-feature-release-notes-config.service';
import { DiscordSoniaService } from '../../../discord/users/services/discord-sonia.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedOptions, MessageEmbedThumbnail } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class FirebaseGuildsNewVersionCountMessageResponseService extends AbstractService {
  private static _instance: FirebaseGuildsNewVersionCountMessageResponseService;

  public static getInstance(): FirebaseGuildsNewVersionCountMessageResponseService {
    if (_.isNil(FirebaseGuildsNewVersionCountMessageResponseService._instance)) {
      FirebaseGuildsNewVersionCountMessageResponseService._instance = new FirebaseGuildsNewVersionCountMessageResponseService();
    }

    return FirebaseGuildsNewVersionCountMessageResponseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_MESSAGE_RESPONSE_SERVICE);
  }

  public getMessageResponse(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): IDiscordMessageResponse {
    return {
      options: {
        embed: this._getMessageEmbed(totalGuildCount, guildCount, channelCount),
        split: false,
      },
      response: ``,
    };
  }

  private _getMessageEmbed(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): MessageEmbedOptions {
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
    return DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance().getReleaseNotesConfigImageColor();
  }

  private _getMessageEmbedDescription(
    totalGuildCount: Readonly<number>,
    guildCount: Readonly<number>,
    channelCount: Readonly<number>
  ): string {
    return FirebaseGuildsNewVersionCountHumanizedService.getInstance().getHumanizedCount(
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
      url: DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance().getReleaseNotesConfigImageUrl(),
    };
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    return `Release notes report`;
  }
}
