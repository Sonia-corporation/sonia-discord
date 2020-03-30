import { GuildChannel } from "discord.js";

export function isDiscordGuildChannel(
  channel: unknown
): channel is GuildChannel {
  return channel instanceof GuildChannel;
}
