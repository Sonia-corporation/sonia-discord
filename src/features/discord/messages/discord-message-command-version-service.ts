import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import moment from 'moment';
import { AppConfigService } from '../../app/app-config-service';
import { AppProductionStateEnum } from '../../app/enums/app-production-state.enum';
import { LoggerService } from '../../logger/logger-service';
import { IDiscordMessageCommandVersionConfig } from '../interfaces/discord-message-command-version-config';
import { DiscordSoniaService } from '../users/discord-sonia-service';
import { DiscordSoniaMentalStateEnum } from '../users/enums/discord-sonia-mental-state.enum';
import { DiscordMessageConfigService } from './discord-message-config-service';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';
import { AnyDiscordMessage } from './types/any-discord-message';

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

  public handle(message: Readonly<AnyDiscordMessage>): IDiscordMessageResponse {
    this._loggerService.debug(this._className, this._loggerService.getSnowflakeContext(message.id, `version command detected`), true);

    const appVersion: string = this._appConfigService.getVersion();
    const totalReleaseCountHumanized: string = this._appConfigService.getTotalReleaseCountHumanized();
    const appReleaseDateHumanized: string = this._appConfigService.getReleaseDateHumanized();
    const appInitializationDateHumanized: string = this._appConfigService.getInitializationDateHumanized();
    const appReleaseNotes: string = this._appConfigService.getReleaseNotes();
    const appProductionStateHumanized: AppProductionStateEnum = this._appConfigService.getProductionStateHumanized();
    const author: MessageEmbedAuthor = this._discordSoniaService.getCorporationMessageEmbedAuthor();
    const soniaFullName: string | null = this._discordSoniaService.getFullName();
    const soniaImageUrl: string | null = this._discordSoniaService.getImageUrl();
    const soniaMentalState: DiscordSoniaMentalStateEnum = this._discordSoniaService.getMentalState();
    const commandVersionConfig: IDiscordMessageCommandVersionConfig = this._discordMessageConfigService.getMessageCommandVersion();

    return {
      options: {
        embed: {
          author,
          color: commandVersionConfig.imageColor,
          fields: [
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
              value: `${appReleaseNotes} Checkout the complete [CHANGELOG](https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CHANGELOG.md)`
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
          ],
          footer: {
            iconURL: soniaImageUrl || ``,
            text: totalReleaseCountHumanized
          },
          thumbnail: {
            url: commandVersionConfig.imageUrl
          },
          timestamp: moment().toDate(),
          title: `${soniaFullName} version`
        },
        split: true
      },
      response: ``
    };
  }
}
