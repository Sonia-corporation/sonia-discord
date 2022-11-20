import { DMChannel, GuildBasedChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a DM channel.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a DM channel.
 */
export function isDiscordDmChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is DMChannel {
  return channel instanceof DMChannel;
}
