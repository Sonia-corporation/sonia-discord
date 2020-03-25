import _ from 'lodash';
import { DiscordAuthorService } from '../../users/services/discord-author-service';
import { IDiscordMessageResponse } from '../interfaces/discord-message-response';
import { AnyDiscordMessage } from '../types/any-discord-message';

export class DiscordMessageAuthorService {
  private static _instance: DiscordMessageAuthorService;

  public static getInstance(): DiscordMessageAuthorService {
    if (_.isNil(DiscordMessageAuthorService._instance)) {
      DiscordMessageAuthorService._instance = new DiscordMessageAuthorService();
    }

    return DiscordMessageAuthorService._instance;
  }

  private readonly _discordAuthorService = DiscordAuthorService.getInstance();

  public reply(message: Readonly<AnyDiscordMessage>): IDiscordMessageResponse {
    let response = `Il est midi !`;

    if (this._discordAuthorService.isValid(message.author)) {
      if (this._discordAuthorService.hasValidUsername(message.author)) {
        response = `Il est midi ${message.author.username} !`;
      }
    }

    return {
      response
    };
  }
}
