import { GuildBasedChannel, StageChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a stage channel.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a stage channel.
 */
export function isDiscordStageChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is StageChannel {
  return channel instanceof StageChannel;
}
