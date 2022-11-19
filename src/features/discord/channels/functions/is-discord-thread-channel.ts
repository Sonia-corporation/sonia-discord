import { GuildBasedChannel, TextBasedChannel, ThreadChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordThreadChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is ThreadChannel {
  return channel instanceof ThreadChannel;
}
