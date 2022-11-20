import { GuildBasedChannel, TextBasedChannel, VoiceChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is a voice channel.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is a voice channel.
 */
export function isDiscordVoiceChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is VoiceChannel {
  return channel instanceof VoiceChannel;
}
