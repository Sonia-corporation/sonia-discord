import { isDiscordNewsChannel } from './is-discord-news-channel';
import { isDiscordTextChannel } from './is-discord-text-channel';
import { isDiscordThreadChannel } from './is-discord-thread-channel';
import { IAnyDiscordWritableChannel } from '../types/any-discord-writable-channel';
import { GuildBasedChannel, TextBasedChannel } from 'discord.js';

/**
 * @description
 * Check if the given channel is writable channel.
 * A writable channel is either a text channel, a news channel or a thread.
 * @param   {GuildBasedChannel | TextBasedChannel | null | undefined} channel The channel to check.
 * @returns {boolean}                                                         Return true when the channel is writable.
 */
export function isDiscordWritableChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is IAnyDiscordWritableChannel {
  return isDiscordTextChannel(channel) || isDiscordNewsChannel(channel) || isDiscordThreadChannel(channel);
}
