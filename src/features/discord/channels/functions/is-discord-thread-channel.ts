import { GuildBasedChannel, TextBasedChannel, ThreadChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordThreadChannel(
  channel: Readonly<GuildBasedChannel | TextBasedChannel | null | undefined>
): channel is ThreadChannel {
  return channel instanceof ThreadChannel;
}
