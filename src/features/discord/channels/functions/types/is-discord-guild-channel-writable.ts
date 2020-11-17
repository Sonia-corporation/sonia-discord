import { GuildChannel, NewsChannel, TextChannel } from 'discord.js';

export function isDiscordGuildChannelWritable(
  guildChannel: Readonly<GuildChannel>
): guildChannel is TextChannel | NewsChannel {
  return guildChannel.isText();
}
