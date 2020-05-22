import { GuildChannel, TextChannel } from "discord.js";
import _ from "lodash";

export function isDiscordGuildChannelWritable(
  guildChannel: Readonly<GuildChannel>
): guildChannel is TextChannel {
  return _.isEqual(guildChannel.type, `text`);
}
