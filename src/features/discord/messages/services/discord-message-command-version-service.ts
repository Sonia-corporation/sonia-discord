import {
  EmbedFieldData,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedOptions,
  MessageEmbedThumbnail
} from 'discord.js';
import _ from 'lodash';
import moment from 'moment';
import { ellipsis } from '../../../../functions/formatters/ellipsis';
import { AppProductionStateEnum } from '../../../app/enums/app-production-state.enum';
import { AppConfigService } from '../../../app/services/app-config-service';
import { LoggerService } from '../../../logger/services/logger-service';
import { IDiscordMessageCommandVersionConfig } from '../../interfaces/discord-message-command-version-config';
import { DiscordSoniaMentalStateEnum } from '../../users/enums/discord-sonia-mental-state.enum';
import { DiscordSoniaService } from '../../users/services/discord-sonia-service';
import { IDiscordMessageResponse } from '../interfaces/discord-message-response';
import { AnyDiscordMessage } from '../types/any-discord-message';
import { DiscordMessageConfigService } from './discord-message-config-service';

export class DiscordMessageCommandVersionService {
  private static _instance: DiscordMessageCommandVersionService;

  public static getInstance(): DiscordMessageCommandVersionService {
    if (_.isNil(DiscordMessageCommandVersionService._instance)) {
      DiscordMessageCommandVersionService._instance = new DiscordMessageCommandVersionService();
    }

    return DiscordMessageCommandVersionService._instance;
  }

  private readonly _appConfigService = AppConfigService.getInstance();
  private readonly _discordSoniaService = DiscordSoniaService.getInstance();
  private readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _className = `DiscordMessageCommandVersionService`;

  public handle(anyDiscordMessage: Readonly<AnyDiscordMessage>): IDiscordMessageResponse {
    this._loggerService.debug({
      context: this._className,
      extendedContext: true,
      message: this._loggerService.getSnowflakeContext(anyDiscordMessage.id, `version command detected`)
    });

    return {
      options: {
        embed: this._getMessageEmbed(),
        split: true
      },
      response: ``
    };
  }

  private _getMessageEmbed(): MessageEmbedOptions {
    return {
      author: this._getMessageEmbedAuthor(),
      color: this._getMessageEmbedColor(),
      fields: this._getMessageEmbedFields(),
      footer: this._getMessageEmbedFooter(),
      thumbnail: this._getMessageEmbedThumbnail(),
      timestamp: this._getMessageEmbedTimestamp(),
      title: this._getMessageEmbedTitle()
    };
  }

  private _getMessageEmbedAuthor(): MessageEmbedAuthor {
    return this._discordSoniaService.getCorporationMessageEmbedAuthor();
  }

  private _getMessageEmbedThumbnail(): MessageEmbedThumbnail {
    const discordMessageCommandVersionConfig: IDiscordMessageCommandVersionConfig = this._discordMessageConfigService.getMessageCommandVersion();

    return {
      url: discordMessageCommandVersionConfig.imageUrl
    };
  }

  private _getMessageEmbedFooter(): MessageEmbedFooter {
    const soniaImageUrl: string | null = this._discordSoniaService.getImageUrl();
    const totalReleaseCountHumanized: string = this._appConfigService.getTotalReleaseCountHumanized();

    return {
      iconURL: soniaImageUrl || undefined,
      text: totalReleaseCountHumanized
    };
  }

  private _getMessageEmbedColor(): number {
    return this._discordMessageConfigService.getMessageCommandVersion().imageColor;
  }

  private _getMessageEmbedTimestamp(): Date {
    return moment().toDate();
  }

  private _getMessageEmbedTitle(): string {
    const soniaFullName: string | null = this._discordSoniaService.getFullName();

    return `${soniaFullName} version`;
  }

  private _getMessageEmbedFields(): EmbedFieldData[] {
    const appVersion: string = this._appConfigService.getVersion();
    const appReleaseDateHumanized: string = this._appConfigService.getReleaseDateHumanized();
    const appInitializationDateHumanized: string = this._appConfigService.getInitializationDateHumanized();
    const appReleaseNotes: string = this._appConfigService.getReleaseNotes();
    const appProductionStateHumanized: AppProductionStateEnum = this._appConfigService.getProductionStateHumanized();
    const soniaMentalState: DiscordSoniaMentalStateEnum = this._discordSoniaService.getMentalState();

    return [
      {
        name: `Application version`,
        value: `[${appVersion}](https://github.com/Sonia-corporation/il-est-midi-discord/releases/tag/${appVersion})`
      },
      {
        inline: true,
        name: `Release date`,
        value: appReleaseDateHumanized
      },
      {
        inline: true,
        name: `Initialization date`,
        value: appInitializationDateHumanized
      },
      {
        name: `Release notes`,
        value: `${ellipsis(appReleaseNotes, 800)}\n\nCheckout the complete [CHANGELOG](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md)`
      },
      {
        inline: true,
        name: `Status`,
        value: `Running in ${appProductionStateHumanized}`
      },
      {
        inline: true,
        name: `Mental state`,
        value: _.capitalize(soniaMentalState)
      }
    ];
  }
}
