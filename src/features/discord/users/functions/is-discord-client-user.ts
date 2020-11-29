import { ClientUser } from 'discord.js';

/**
 * @param user
 */
export function isDiscordClientUser(user: unknown): user is ClientUser {
  return user instanceof ClientUser;
}
