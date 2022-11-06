import { DMChannel, TextBasedChannels } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordDmChannel(channel: Readonly<TextBasedChannels | null | undefined>): channel is DMChannel {
  return channel instanceof DMChannel;
}
