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

  public reply(discordMessage: Readonly<AnyDiscordMessage>): IDiscordMessageResponse {
    let response = `Il est midi !`;

    if (this._discordAuthorService.isValid(discordMessage.author)) {
      if (this._discordAuthorService.hasValidUsername(discordMessage.author)) {
        response = `Il est midi ${discordMessage.author.username} !`;
      }
    }

    return {
      response
    };
  }
}
