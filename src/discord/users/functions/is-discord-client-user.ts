import { ClientUser } from 'discord.js';

export function isDiscordClientUser(user: unknown): boolean {
  return user instanceof ClientUser;
}
