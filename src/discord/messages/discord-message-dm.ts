import _ from 'lodash';
import { DiscordAuthor } from '../users/discord-author';
import { DiscordSonia } from '../users/discord-sonia';
import { DiscordMessageAuthor } from './discord-message-author';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessageDm {
  private static _instance: DiscordMessageDm;

  public static getInstance(): DiscordMessageDm {
    if (_.isNil(DiscordMessageDm._instance)) {
      DiscordMessageDm._instance = new DiscordMessageDm();
    }

    return DiscordMessageDm._instance;
  }

  private readonly _discordSonia = DiscordSonia.getInstance();
  private readonly _discordAuthor = DiscordAuthor.getInstance();
  private readonly _discordMessageAuthor = DiscordMessageAuthor.getInstance();

  public getDmMessage(message: Readonly<AnyDiscordMessage>): string | null {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (!this._discordSonia.isSonia(message.author.id)) {
        return this._discordMessageAuthor.replyToAuthor(message);
      }
    }

    return null;
  }
}
