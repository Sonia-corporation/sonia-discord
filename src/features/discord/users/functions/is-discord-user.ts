import { User } from 'discord.js';

export function isDiscordUser(user: unknown): boolean {
  return user instanceof User;
}
