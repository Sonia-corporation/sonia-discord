import {
  GuildChannel,
  GuildMember,
  MessageMentions,
  Role,
  User
} from 'discord.js';
import _ from 'lodash';
import { AnyDiscordMessageMentions } from './types/any-discord-message-mentions';

export class DiscordMention {
  private static _instance: DiscordMention;

  public static getInstance(): DiscordMention {
    if (_.isNil(DiscordMention._instance)) {
      DiscordMention._instance = new DiscordMention();
    }

    return DiscordMention._instance;
  }

  public isValidMessageMentions(mention: unknown): mention is AnyDiscordMessageMentions {
    return this.isMessageMentions(mention);
  }

  public isMessageMentions(mention: unknown): boolean {
    return mention instanceof MessageMentions;
  }

  public isMentionForEveryone(mention: AnyDiscordMessageMentions): boolean {
    return mention.everyone;
  }

  public isUserMentioned(
    mention: AnyDiscordMessageMentions,
    user: User | GuildMember | Role | GuildChannel
  ): boolean {
    return mention.has(user);
  }
}
