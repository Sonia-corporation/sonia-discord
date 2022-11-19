import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import { IDiscordMessageNormalFlag } from '../../../types/commands/flags/discord-message-normal-flag';
import _ from 'lodash';

/**
 * @description
 * Check either or nor the given message flag is a flag or a shortcut flag.
 * Based on the prefix.
 * @param   {IDiscordMessageFlag} messageFlag The message containing a flag.
 * @returns {boolean}                         True when a flag.
 * @example
 * discordCommandIsMessageFlag('')             => false
 * discordCommandIsMessageFlag('dummy')        => false
 * discordCommandIsMessageFlag('-dummy')       => false
 * discordCommandIsMessageFlag('--dummy')      => true
 * discordCommandIsMessageFlag('--dummy=')     => true
 * discordCommandIsMessageFlag('--dummy=true') => true
 */
export function discordCommandIsMessageFlag(
  messageFlag: IDiscordMessageFlag
): messageFlag is IDiscordMessageNormalFlag {
  return _.startsWith(messageFlag, `--`);
}
