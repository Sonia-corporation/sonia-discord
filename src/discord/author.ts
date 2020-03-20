import { User } from 'discord.js';
import _ from 'lodash';
import { AnyDiscordAuthor } from './types/any-discord-author';

export class DiscordAuthor {
  private static _instance: DiscordAuthor;

  public static getInstance(): DiscordAuthor {
    if (_.isNil(DiscordAuthor._instance)) {
      DiscordAuthor._instance = new DiscordAuthor();
    }

    return DiscordAuthor._instance;
  }

  public isValidAuthor(author: unknown): author is AnyDiscordAuthor {
    return this.isUser(author);
  }

  public isUser(author: unknown): boolean {
    return author instanceof User;
  }
}
