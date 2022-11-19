import { discordCommandIsMessageFlag } from './discord-command-is-message-flag';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import _ from 'lodash';

const FLAG_SIZE = 2;

/**
 * @param value
 */
function isValidValue(value: string | undefined): value is string {
  return _.isString(value) && !_.isEmpty(value);
}

/**
 * @param flags
 */
function getFlagValue(flags: string[]): string | undefined {
  return _.last(flags);
}

/**
 * @param messageFlag
 */
function isFlag(messageFlag: IDiscordMessageFlag): boolean {
  return discordCommandIsMessageFlag(messageFlag);
}

/**
 * @param messageFlag
 */
function separateFlagNameFromValue(messageFlag: IDiscordMessageFlag): string[] {
  return _.split(messageFlag, `=`);
}

/**
 * @param splittedFlag
 */
function hasValue(splittedFlag: string[]): boolean {
  const splittedFlagSize: number = _.size(splittedFlag);

  return _.isEqual(splittedFlagSize, FLAG_SIZE);
}

/**
 * @description
 * Extract the flag value from a message flag
 * @example
 * discordCommandGetFlagValue('')          => null
 * discordCommandGetFlagValue('-f')        => null
 * discordCommandGetFlagValue('-f=')       => null
 * discordCommandGetFlagValue('-f=dummy')  => null
 * discordCommandGetFlagValue('--f')       => null
 * discordCommandGetFlagValue('--f=')      => null
 * discordCommandGetFlagValue('--f=dummy') => dummy
 * @param {IDiscordMessageFlag} messageFlag A flag as a message
 * @returns {string | null} A string when the flag value exists else null
 */
export function discordCommandGetFlagValue(messageFlag: IDiscordMessageFlag): string | null {
  if (!isFlag(messageFlag)) {
    return null;
  }

  const splittedFlag: string[] = separateFlagNameFromValue(messageFlag);

  if (!hasValue(splittedFlag)) {
    return null;
  }

  const flagValue: string | undefined = getFlagValue(splittedFlag);

  if (!isValidValue(flagValue)) {
    return null;
  }

  return flagValue;
}
