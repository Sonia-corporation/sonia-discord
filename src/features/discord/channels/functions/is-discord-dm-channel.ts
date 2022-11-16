import { DMChannel, TextBasedChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordDmChannel(channel: Readonly<TextBasedChannel | null | undefined>): channel is DMChannel {
  return channel instanceof DMChannel;
}
