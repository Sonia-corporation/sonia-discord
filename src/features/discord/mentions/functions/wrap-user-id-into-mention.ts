import { Snowflake } from 'discord.js';

/**
 * @description
 * Wrap it with an alias mention (<@!snowflake>)
 * @param {Snowflake} userId The user id to wrap
 * @returns {string} The given user id wrapped into a nickname mention
 */
export function wrapUserIdIntoMention(userId: Snowflake): string {
  return `<@!${userId}>`;
}
