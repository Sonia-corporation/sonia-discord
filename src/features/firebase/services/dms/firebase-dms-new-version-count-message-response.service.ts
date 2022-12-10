import { FirebaseDmsNewVersionCountHumanizedService } from './firebase-dms-new-version-count-humanized.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from '../../../discord/messages/services/command/feature/features/release-notes/services/config/discord-message-command-feature-release-notes-config.service';
import { DiscordSoniaService } from '../../../discord/users/services/discord-sonia.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedOptions, MessageEmbedThumbnail } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';

export class FirebaseDmsNewVersionCountMessageResponseService extends AbstractService {
  private static _instance: FirebaseDmsNewVersionCountMessageResponseService;

  public static getInstance(): FirebaseDmsNewVersionCountMessageResponseService {
    if (_.isNil(FirebaseDmsNewVersionCountMessageResponseService._instance)) {
      FirebaseDmsNewVersionCountMessageResponseService._instance =
        new FirebaseDmsNewVersionCountMessageResponseService();
    }

    return FirebaseDmsNewVersionCountMessageResponseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_COUNT_MESSAGE_RESPONSE_SERVICE);
  }

  public getMessageResponse(totalDmCount: number, dmCount: number): IDiscordMessageResponse {
    return {
      options: {
        embeds: [this._getMessageEmbed(totalDmCount, dmCount)],
      },
    };
  }

  private _getMessageEmbed(totalDmCount: number, dmCount: number): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      description: this._getMessageEmbedDescription(totalDmCount, dmCount),
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

  private _getMessageEmbedDescription(totalDmCount: number, dmCount: number): string {
    return FirebaseDmsNewVersionCountHumanizedService.getInstance().getHumanizedCount(totalDmCount, dmCount);
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
