import { GuildChannel } from "discord.js";
import _ from "lodash";

export class DiscordChannelGuildService {
  private static _instance: DiscordChannelGuildService;

  public static getInstance(): DiscordChannelGuildService {
    if (_.isNil(DiscordChannelGuildService._instance)) {
      DiscordChannelGuildService._instance = new DiscordChannelGuildService();
    }

    return DiscordChannelGuildService._instance;
  }

  public isGeneral(channel: Readonly<GuildChannel>): boolean {
    return _.isEqual(_.deburr(channel.name), `general`);
  }
}
