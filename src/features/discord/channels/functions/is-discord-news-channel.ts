import { GuildBasedChannel, NewsChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a news channel.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a news channel.
 */
export function isDiscordNewsChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is NewsChannel {
  return channel instanceof NewsChannel;
}
