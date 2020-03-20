import _ from 'lodash';
import { isDiscordDmChannel } from './functions/is-discord-dm-channel';
import { isDiscordTextChannel } from './functions/is-discord-text-channel';
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
    if (isDiscordTextChannel(channel)) {
      return true;
    } else if (isDiscordDmChannel(channel)) {
      return true;
    }

    return false;
  }
}
