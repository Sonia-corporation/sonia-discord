import { ThreadChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordThreadChannel(channel: unknown): channel is ThreadChannel {
  return channel instanceof ThreadChannel;
}
