import { GuildChannel } from 'discord.js';

/**
 * @param channel
 */
export function isDiscordGuildChannel(channel: unknown): channel is GuildChannel {
  return channel instanceof GuildChannel;
}
