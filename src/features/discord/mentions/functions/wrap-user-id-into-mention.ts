import { Snowflake } from 'discord.js';

/**
 * @description
 * Wrap it with an alias mention (<@!snowflake>)
 *
 * @param {Readonly<Snowflake>} userId The user id to wrap
 *
 * @returns {string} The given user id wrapped into a nickname mention
 */
export function wrapUserIdIntoMention(userId: Readonly<Snowflake>): string {
  return `<@!${userId}>`;
}
