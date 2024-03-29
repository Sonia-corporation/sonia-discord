import { discordCommandIsMessageFlag } from './discord-command-is-message-flag';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import _ from 'lodash';

const FLAG_SIZE = 2;

function isValidValue(value: string | undefined): value is string {
  return _.isString(value) && !_.isEmpty(value);
}

function getFlagValue(flags: string[]): string | undefined {
  return _.last(flags);
}

function isFlag(messageFlag: IDiscordMessageFlag): boolean {
  return discordCommandIsMessageFlag(messageFlag);
}

function separateFlagNameFromValue(messageFlag: IDiscordMessageFlag): string[] {
  return _.split(messageFlag, `=`);
}

function hasValue(splittedFlag: string[]): boolean {
  const splittedFlagSize: number = _.size(splittedFlag);

  return _.isEqual(splittedFlagSize, FLAG_SIZE);
}

/**
 * @description
 * Extract the flag value from a message flag.
 * @param   {IDiscordMessageFlag} messageFlag A flag as a message.
 * @returns {string | null}                   A string when the flag value exists else null.
 * @example
 * discordCommandGetFlagValue('')          => null
 * discordCommandGetFlagValue('-f')        => null
 * discordCommandGetFlagValue('-f=')       => null
 * discordCommandGetFlagValue('-f=dummy')  => null
 * discordCommandGetFlagValue('--f')       => null
 * discordCommandGetFlagValue('--f=')      => null
 * discordCommandGetFlagValue('--f=dummy') => dummy
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
