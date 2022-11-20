import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import _ from 'lodash';

/**
 * @description
 * Return the flag message without the flag prefix "-" or "--".
 * @param   {IDiscordMessageFlag} messageFlag A flag as a message.
 * @returns {string}                          The flag message without the flag prefix "-" or "--".
 * @example
 * discordCommandRemoveFlagPrefix('')      => ''
 * discordCommandRemoveFlagPrefix('dummy') => dummy
 * discordCommandRemoveFlagPrefix('-f')    => f
 * discordCommandRemoveFlagPrefix('--f')   => f
 */
export function discordCommandRemoveFlagPrefix(messageFlag: IDiscordMessageFlag): string {
  return _.trimStart(messageFlag, `--`);
}
