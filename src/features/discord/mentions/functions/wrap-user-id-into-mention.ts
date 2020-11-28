import { Snowflake } from 'discord.js';

/**
 * @param userId
 */
export function wrapUserIdIntoMention(userId: Readonly<Snowflake>): string {
  return `<@!${userId}>`;
}
