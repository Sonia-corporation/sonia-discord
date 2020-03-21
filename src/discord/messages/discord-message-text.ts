import _ from 'lodash';
import { DiscordMention } from '../mentions/discord-mention';
import { DiscordAuthor } from '../users/discord-author';
import { DiscordSonia } from '../users/discord-sonia';
import { Sonia } from '../users/types/sonia';
import { DiscordMessageAuthor } from './discord-message-author';
import { AnyDiscordMessage } from './types/any-discord-message';

export class DiscordMessageText {
  private static _instance: DiscordMessageText;

  public static getInstance(): DiscordMessageText {
    if (_.isNil(DiscordMessageText._instance)) {
      DiscordMessageText._instance = new DiscordMessageText();
    }

    return DiscordMessageText._instance;
  }

  private readonly _discordSonia = DiscordSonia.getInstance();
  private readonly _discordAuthor = DiscordAuthor.getInstance();
  private readonly _discordMention = DiscordMention.getInstance();
  private readonly _discordMessageAuthor = DiscordMessageAuthor.getInstance();

  public getTextMessage(message: Readonly<AnyDiscordMessage>): string | null {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (!this._discordSonia.isSonia(message.author.id)) {
        console.log(message);
        if (this._discordMention.isValidMessageMentions(message.mentions)) {
          if (this._discordMention.isMentionForEveryone(message.mentions)) {
            return 'Il est midi tout le monde !';
          } else {
            const sonia: Sonia | null = this._discordSonia.getSonia();

            if (this._discordSonia.isSoniaValid(sonia)) {
              if (this._discordMention.isUserMentioned(message.mentions, sonia)) {
                return this._discordMessageAuthor.replyToAuthor(message);
              }
            }
          }
        }
      }
    }

    return null;
  }
}
