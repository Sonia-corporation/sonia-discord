import xregexp from 'xregexp';

/**
 * @returns {RegExp} A RegExp matching a Discord user mention
 */
export function discordGetMentionRegexp(): RegExp {
  return xregexp(`<@!\\d+>`, `gim`);
}
