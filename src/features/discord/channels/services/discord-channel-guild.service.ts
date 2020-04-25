import { Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { isDiscordGuild } from "../../guilds/functions/is-discord-guild";
import { isDiscordGuildChannel } from "../functions/is-discord-guild-channel";

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

  public isGeneral(channel: Readonly<GuildChannel>): boolean {
    return _.isEqual(_.toLower(_.deburr(channel.name)), `general`);
  }

  public getPrimary(guild: Readonly<Guild>): GuildChannel | null {
    if (isDiscordGuild(guild)) {
      const primaryChannel:
        | GuildChannel
        | undefined = guild.channels.cache.find(
        (channel: Readonly<GuildChannel>): boolean => {
          return this.isGeneral(channel);
        }
      );

      if (isDiscordGuildChannel(primaryChannel)) {
        return primaryChannel;
      }
    }

    return null;
  }
}
