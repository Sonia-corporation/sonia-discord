import { isDiscordNewsChannel } from './is-discord-news-channel';
import { isDiscordTextChannel } from './is-discord-text-channel';
import { isDiscordThreadChannel } from './is-discord-thread-channel';
import { IAnyDiscordWritableChannel } from '../types/any-discord-writable-channel';
import { GuildBasedChannel, TextBasedChannel } from 'discord.js';

export function isDiscordWritableChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is IAnyDiscordWritableChannel {
  return isDiscordTextChannel(channel) || isDiscordNewsChannel(channel) || isDiscordThreadChannel(channel);
}
