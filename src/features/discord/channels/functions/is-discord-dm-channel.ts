import { DMChannel, GuildBasedChannel, TextBasedChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordDmChannel(
  channel: Readonly<GuildBasedChannel | TextBasedChannel | null | undefined>
): channel is DMChannel {
  return channel instanceof DMChannel;
}
