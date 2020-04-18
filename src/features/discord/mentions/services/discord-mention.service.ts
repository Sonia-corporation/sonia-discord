import { GuildChannel, GuildMember, Role, User } from "discord.js";
import _ from "lodash";
import { isDiscordMessageMentions } from "../functions/is-discord-message-mentions";
import { AnyDiscordMessageMentions } from "../types/any-discord-message-mentions";

export class DiscordMentionService {
  private static _instance: DiscordMentionService;

  public static getInstance(): DiscordMentionService {
    if (_.isNil(DiscordMentionService._instance)) {
      DiscordMentionService._instance = new DiscordMentionService();
    }

    return DiscordMentionService._instance;
  }

  public isValid(mention: unknown): mention is AnyDiscordMessageMentions {
    return isDiscordMessageMentions(mention);
  }

  public isForEveryone(
    anyDiscordMessageMentions: Readonly<AnyDiscordMessageMentions>
  ): boolean {
    return _.isEqual(anyDiscordMessageMentions.everyone, true);
  }

  public isUserMentioned(
    anyDiscordMessageMentions: Readonly<AnyDiscordMessageMentions>,
    user: User | GuildMember | Role | GuildChannel
  ): boolean {
    return anyDiscordMessageMentions.has(user);
  }
}
