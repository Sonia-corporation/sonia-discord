import {
  DMChannel,
  TextChannel
} from 'discord.js';
import _ from 'lodash';
import { AnyDiscordChannel } from './types/any-discord-channel';

export class DiscordChannel {
  private static _instance: DiscordChannel;

  public static getInstance(): DiscordChannel {
    if (_.isNil(DiscordChannel._instance)) {
      DiscordChannel._instance = new DiscordChannel();
    }

    return DiscordChannel._instance;
  }

  public isValidChannel(channel: unknown): channel is AnyDiscordChannel {
    if (this.isTextChannel(channel)) {
      return true;
    } else if (this.isDmChannel(channel)) {
      return true;
    }

    return false;
  }

  public isTextChannel(channel: unknown): boolean {
    return channel instanceof TextChannel;
  }

  public isDmChannel(channel: unknown): boolean {
    return channel instanceof DMChannel;
  }
}
