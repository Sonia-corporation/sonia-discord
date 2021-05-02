import { DMChannel, NewsChannel, TextChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordDmChannel(
  channel: Readonly<TextChannel | DMChannel | NewsChannel | null | undefined>
): channel is DMChannel {
  return channel instanceof DMChannel;
}
