import { GuildChannel, NewsChannel, TextChannel, ThreadChannel } from 'discord.js';

/**
 * @param guildChannel
 */
export function isDiscordGuildChannelWritable(
  guildChannel: Readonly<GuildChannel | ThreadChannel>
): guildChannel is TextChannel | NewsChannel {
  return guildChannel.isText();
}
