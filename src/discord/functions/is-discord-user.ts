import { User } from 'discord.js';

export function isDiscordUser(author: unknown): boolean {
  return author instanceof User;
}
