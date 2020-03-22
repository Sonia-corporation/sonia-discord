import _ from 'lodash';
import { AppConfigService } from '../../app/app-config-service';
import { DiscordSoniaService } from '../users/discord-sonia-service';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';

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
  private readonly _versionImageUrl = 'https://i.ibb.co/ph17BqP/icons8-artificial-intelligence-512.png';
  private readonly _versionImageColor = 11912416;

  public handle(): IDiscordMessageResponse {
    const version: string = this._appConfigService.getVersion();

    return {
      options: {
        embed: {
          author: this._discordSoniaService.getCorporationMessageEmbedAuthor(),
          color: this._versionImageColor,
          fields: [
            {
              name: 'Application version',
              value: version
            },
            {
              name: 'Status',
              value: 'Ready'
            },
            {
              name: 'Mental state',
              value: `Crazy`
            }
          ],
          thumbnail: {
            url: this._versionImageUrl
          },
          title: 'Sonia-il-est-midi version',
          url: `https://github.com/Sonia-corporation/il-est-midi-discord/releases/tag/${version}`
        },
        split: true
      },
      response: ''
    };
  }
}
