import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { isDiscordDmChannel } from '../functions/is-discord-dm-channel';
import { isDiscordTextChannel } from '../functions/is-discord-text-channel';
import { isDiscordThreadChannel } from '../functions/is-discord-thread-channel';
import { IAnyDiscordChannel } from '../types/any-discord-channel';
import { DMChannel, TextBasedChannel, TextChannel, ThreadChannel } from 'discord.js';
import _ from 'lodash';

export class DiscordChannelService extends AbstractService {
  private static _instance: DiscordChannelService;

  public static getInstance(): DiscordChannelService {
    if (_.isNil(DiscordChannelService._instance)) {
      DiscordChannelService._instance = new DiscordChannelService();
    }

    return DiscordChannelService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_CHANNEL_SERVICE);
  }

  public isValid(channel: TextBasedChannel | null | undefined): channel is IAnyDiscordChannel {
    return !!(this.isText(channel) || this.isDm(channel) || this.isThread(channel));
  }

  public isText(channel: TextBasedChannel | null | undefined): channel is TextChannel {
    return isDiscordTextChannel(channel);
  }

  public isDm(channel: TextBasedChannel | null | undefined): channel is DMChannel {
    return isDiscordDmChannel(channel);
  }

  public isThread(channel: TextBasedChannel | null | undefined): channel is ThreadChannel {
    return isDiscordThreadChannel(channel);
  }
}
