import { TextChannel } from 'discord.js';

export function isDiscordTextChannel(channel: unknown): boolean {
  return channel instanceof TextChannel;
}
