import { DMChannel } from 'discord.js';

export function isDiscordDmChannel(channel: unknown): boolean {
  return channel instanceof DMChannel;
}
