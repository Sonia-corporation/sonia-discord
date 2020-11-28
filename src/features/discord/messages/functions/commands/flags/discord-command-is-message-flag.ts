import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import { IDiscordMessageNormalFlag } from '../../../types/commands/flags/discord-message-normal-flag';
import _ from 'lodash';

/**
 * @description
 * Check either or nor the given message flag is a flag or a shortcut flag
 * Based on the prefix
 *
 * @example
 * discordCommandIsMessageFlag('')             => false
 * discordCommandIsMessageFlag('dummy')        => false
 * discordCommandIsMessageFlag('-dummy')       => false
 * discordCommandIsMessageFlag('--dummy')      => true
 * discordCommandIsMessageFlag('--dummy=')     => true
 * discordCommandIsMessageFlag('--dummy=true') => true
 *
 * @param {Readonly<IDiscordMessageFlag>} messageFlag The message containing a flag
 *
 * @returns {boolean} true when a flag
 */
export function discordCommandIsMessageFlag(
  messageFlag: Readonly<IDiscordMessageFlag>
): messageFlag is IDiscordMessageNormalFlag {
  return _.startsWith(messageFlag, `--`);
}
