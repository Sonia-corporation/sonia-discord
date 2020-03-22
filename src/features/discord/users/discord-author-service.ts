import _ from 'lodash';
import { isDiscordUser } from './functions/is-discord-user';
import { AnyDiscordAuthor } from './types/any-discord-author';

export class DiscordAuthorService {
  private static _instance: DiscordAuthorService;

  public static getInstance(): DiscordAuthorService {
    if (_.isNil(DiscordAuthorService._instance)) {
      DiscordAuthorService._instance = new DiscordAuthorService();
    }

    return DiscordAuthorService._instance;
  }

  public isValid(author: unknown): author is AnyDiscordAuthor {
    return isDiscordUser(author);
  }

  public hasValidUsername(author: Readonly<AnyDiscordAuthor>): boolean {
    return _.isString(author.username) && !_.isEmpty(author.username);
  }

  public isBot(author: Readonly<AnyDiscordAuthor>): boolean {
    return _.isEqual(author.bot, true);
  }
}
