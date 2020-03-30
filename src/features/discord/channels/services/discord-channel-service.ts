import { DMChannel, TextChannel } from "discord.js";
import _ from "lodash";
import { isDiscordDmChannel } from "../functions/is-discord-dm-channel";
import { isDiscordTextChannel } from "../functions/is-discord-text-channel";
import { AnyDiscordChannel } from "../types/any-discord-channel";

export class DiscordChannelService {
  private static _instance: DiscordChannelService;

  public static getInstance(): DiscordChannelService {
    if (_.isNil(DiscordChannelService._instance)) {
      DiscordChannelService._instance = new DiscordChannelService();
    }

    return DiscordChannelService._instance;
  }

  public isValid(channel: unknown): channel is AnyDiscordChannel {
    if (this.isText(channel)) {
      return true;
    } else if (this.isDm(channel)) {
      return true;
    }

    return false;
  }

  public isText(channel: unknown): channel is TextChannel {
    return isDiscordTextChannel(channel);
  }

  public isDm(channel: unknown): channel is DMChannel {
    return isDiscordDmChannel(channel);
  }
}
