import { GuildBasedChannel, NewsChannel, TextBasedChannel } from 'discord.js';

export function isDiscordNewsChannel(
  channel: GuildBasedChannel | TextBasedChannel | null | undefined
): channel is NewsChannel {
  return channel instanceof NewsChannel;
}
