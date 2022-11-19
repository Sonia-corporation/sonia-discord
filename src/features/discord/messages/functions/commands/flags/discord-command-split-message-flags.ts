import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import _ from 'lodash';

/**
 * @description
 * Split a message containing a list of flags to an array of flags
 * @param {string} messageFlags A partial message containing only a string with flags
 * @returns {IDiscordMessageFlag[]} An array of Discord message flag
 */
export function discordCommandSplitMessageFlags(messageFlags: string): IDiscordMessageFlag[] {
  return _.isEmpty(messageFlags) ? [] : _.split(messageFlags, ` `);
}
