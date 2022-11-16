import { GuildBasedChannel, NewsChannel, TextBasedChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordNewsChannel(
  channel: Readonly<GuildBasedChannel | TextBasedChannel | null | undefined>
): channel is NewsChannel {
  return channel instanceof NewsChannel;
}
