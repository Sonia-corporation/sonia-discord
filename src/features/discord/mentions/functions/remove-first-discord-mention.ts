import { discordGetMentionRegexp } from './discord-get-mention-regexp';
import _ from 'lodash';
import xregexp from 'xregexp';

/**
 * @description
 * Remove the first mention from the given message
 * @param {string} message The message to alter
 * @returns {string} The message without the first encountered mention
 */
export function removeFirstDiscordMention(message: string): string {
  return _.trim(xregexp.replace(message, discordGetMentionRegexp(), ``, `one`));
}
