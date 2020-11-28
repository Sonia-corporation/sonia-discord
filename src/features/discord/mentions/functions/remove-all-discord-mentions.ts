import { discordGetMentionRegexp } from './discord-get-mention-regexp';
import _ from 'lodash';
import xregexp from 'xregexp';

/**
 * @description
 * Remove all the mentions from the given message
 *
 * @param {Readonly<string>} message The message to alter
 *
 * @returns {string} The message without any mentions
 */
export function removeAllDiscordMentions(message: Readonly<string>): string {
  return _.trim(xregexp.replace(message, discordGetMentionRegexp(), ``, `all`));
}
