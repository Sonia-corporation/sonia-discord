import { CategoryChannel, GuildBasedChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a category channel.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a category channel.
 */
export function isDiscordCategoryChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is CategoryChannel {
  return channel instanceof CategoryChannel;
}
