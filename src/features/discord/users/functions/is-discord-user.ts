import { User } from 'discord.js';

/**
 * @param user
 */
export function isDiscordUser(user: unknown): user is User {
  return user instanceof User;
}
