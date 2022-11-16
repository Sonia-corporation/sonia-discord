import { TextBasedChannel, TextChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordTextChannel(channel: Readonly<TextBasedChannel | null | undefined>): channel is TextChannel {
  return channel instanceof TextChannel;
}
