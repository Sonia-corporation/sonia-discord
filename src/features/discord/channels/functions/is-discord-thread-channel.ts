import { GuildBasedChannel, TextBasedChannel, ThreadChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a thread.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a thread.
 */
export function isDiscordThreadChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is ThreadChannel {
  return channel instanceof ThreadChannel;
}
