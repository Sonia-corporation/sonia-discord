import { GuildBasedChannel, TextBasedChannel, TextChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a text channel.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a text channel.
 */
export function isDiscordTextChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is TextChannel {
  return channel instanceof TextChannel;
}
