import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { isDiscordGuild } from '../../guilds/functions/is-discord-guild';
import { isDiscordWritableChannel } from '../functions/is-discord-writable-channel';
import { IAnyDiscordWritableChannel } from '../types/any-discord-writable-channel';
import { Guild, GuildBasedChannel } from 'discord.js';
import _ from 'lodash';

export class DiscordChannelGuildService extends AbstractService {
  private static _instance: DiscordChannelGuildService;

  public static getInstance(): DiscordChannelGuildService {
    if (_.isNil(DiscordChannelGuildService._instance)) {
      DiscordChannelGuildService._instance = new DiscordChannelGuildService();
    }

    return DiscordChannelGuildService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_CHANNEL_GUILD_SERVICE);
  }

  public isGeneral({ name }: Readonly<GuildBasedChannel>): boolean {
    if (_.isString(name)) {
      return _.isEqual(_.toLower(_.deburr(name)), `general`);
    }

    return false;
  }

  public getPrimary(guild: Readonly<Guild>): IAnyDiscordWritableChannel | null {
    if (!isDiscordGuild(guild)) {
      return null;
    }

    const primaryGuildBasedChannel: GuildBasedChannel | undefined = guild.channels.cache.find(
      (channel: Readonly<GuildBasedChannel>): boolean => this.isGeneral(channel)
    );

    if (!isDiscordWritableChannel(primaryGuildBasedChannel)) {
      return null;
    }

    return primaryGuildBasedChannel;
  }
}
