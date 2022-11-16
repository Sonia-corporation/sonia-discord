import { GuildBasedChannel, TextBasedChannel, TextChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordTextChannel(
  channel: Readonly<GuildBasedChannel | TextBasedChannel | null | undefined>
): channel is TextChannel {
  return channel instanceof TextChannel;
}
