import { isDiscordDmChannel } from './functions/is-discord-dm-channel';
import { isDiscordTextChannel } from './functions/is-discord-text-channel';
import { AnyDiscordChannel } from './types/any-discord-channel';
import _ from 'lodash';

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
    return isDiscordTextChannel(channel);
  }

  public isDmChannel(channel: unknown): boolean {
    return isDiscordDmChannel(channel);
  }
}
