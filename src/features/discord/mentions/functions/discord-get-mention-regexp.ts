import xregexp from 'xregexp';

/**
 * @description
 * Find mentions like:
 * - <@!snowflake> (nickname mention - best way to mention someone)
 * - <@snowflake> (real name mention)
 *
 * @returns {RegExp} A RegExp matching a Discord user mention
 */
export function discordGetMentionRegexp(): RegExp {
  return xregexp(`<@!?\\d+>`, `gim`);
}
