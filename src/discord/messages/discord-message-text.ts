import _ from 'lodash';
import { DiscordMention } from '../mentions/discord-mention';
import { DiscordAuthor } from '../users/discord-author';
import { DiscordSonia } from '../users/discord-sonia';
import { Sonia } from '../users/types/sonia';
import { DiscordMessageAuthor } from './discord-message-author';
import { DiscordMessageCommand } from './discord-message-command';
import { DiscordMessageContent } from './discord-message-content';
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
  private readonly _discordMessageCommand = DiscordMessageCommand.getInstance();
  private readonly _discordMessageContent = DiscordMessageContent.getInstance();

  public getMessage(message: Readonly<AnyDiscordMessage>): string | null {
    if (this._discordAuthor.isValid(message.author)) {
      if (!this._discordSonia.isSonia(message.author.id)) {
        if (this._discordMention.isValid(message.mentions)) {
          if (this._discordMention.isForEveryone(message.mentions)) {
            return 'Il est midi tout le monde !';
          }
          const sonia: Sonia | null = this._discordSonia.getSonia();

          if (this._discordSonia.isValid(sonia)) {
            if (this._discordMention.isUserMentioned(message.mentions, sonia)) {
              console.log(message.content);

              if (this._discordMessageContent.hasContent(message.content)) {
                if (this._discordMessageCommand.hasCommand(message.content)) {
                  return this._discordMessageCommand.handleCommands(message.content);
                }
              }

              return this._discordMessageAuthor.reply(message);
            }
          }
        }
      }
    }

    return null;
  }
}
