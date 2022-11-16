import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { isDiscordDmChannel } from '../functions/is-discord-dm-channel';
import { isDiscordTextChannel } from '../functions/is-discord-text-channel';
import { IAnyDiscordChannel } from '../types/any-discord-channel';
import { DMChannel, TextBasedChannel, TextChannel } from 'discord.js';
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

  public isValid(channel: Readonly<TextBasedChannel | null | undefined>): channel is IAnyDiscordChannel {
    return !!(this.isText(channel) || this.isDm(channel));
  }

  public isText(channel: Readonly<TextBasedChannel | null | undefined>): channel is TextChannel {
    return isDiscordTextChannel(channel);
  }

  public isDm(channel: Readonly<TextBasedChannel | null | undefined>): channel is DMChannel {
    return isDiscordDmChannel(channel);
  }
}
