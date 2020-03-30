import { DMChannel } from "discord.js";

export function isDiscordDmChannel(channel: unknown): channel is DMChannel {
  return channel instanceof DMChannel;
}
