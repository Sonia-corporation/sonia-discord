import { TextChannel } from "discord.js";

export function isDiscordTextChannel(channel: unknown): channel is TextChannel {
  return channel instanceof TextChannel;
}
