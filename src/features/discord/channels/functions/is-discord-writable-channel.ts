import { isDiscordNewsChannel } from './is-discord-news-channel';
import { isDiscordTextChannel } from './is-discord-text-channel';
import { GuildBasedChannel, NewsChannel, TextBasedChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordWritableChannel(
  channel: Readonly<GuildBasedChannel | TextBasedChannel | null | undefined>
): channel is NewsChannel | NewsChannel {
  return isDiscordTextChannel(channel) || isDiscordNewsChannel(channel);
}
