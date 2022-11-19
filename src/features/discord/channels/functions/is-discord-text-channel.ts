import { GuildBasedChannel, TextBasedChannel, TextChannel } from 'discord.js';

export function isDiscordTextChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is TextChannel {
  return channel instanceof TextChannel;
}
