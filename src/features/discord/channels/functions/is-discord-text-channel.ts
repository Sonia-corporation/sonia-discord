import { DMChannel, NewsChannel, TextChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordTextChannel(
  channel: Readonly<TextChannel | DMChannel | NewsChannel | null | undefined>
): channel is TextChannel {
  return channel instanceof TextChannel;
}
