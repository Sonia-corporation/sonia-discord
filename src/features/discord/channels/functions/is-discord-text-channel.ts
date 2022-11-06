import { TextBasedChannels, TextChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordTextChannel(channel: Readonly<TextBasedChannels | null | undefined>): channel is TextChannel {
  return channel instanceof TextChannel;
}
