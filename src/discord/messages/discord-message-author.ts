import _ from 'lodash';
import { DiscordAuthor } from '../users/discord-author';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessageAuthor {
  private static _instance: DiscordMessageAuthor;

  public static getInstance(): DiscordMessageAuthor {
    if (_.isNil(DiscordMessageAuthor._instance)) {
      DiscordMessageAuthor._instance = new DiscordMessageAuthor();
    }

    return DiscordMessageAuthor._instance;
  }

  private readonly _discordAuthor = DiscordAuthor.getInstance();

  public replyToAuthor(message: Readonly<AnyDiscordMessage>): string {
    let response = 'Il est midi !';

    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (this._discordAuthor.hasValidAuthorUsername(message.author)) {
        response = `Il est midi ${message.author.username} !`;
      }
    }

    return response;
  }
}
