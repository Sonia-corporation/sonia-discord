import _ from "lodash";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { discordCommandIsMessageFlag } from "./discord-command-is-message-flag";

const FLAG_SIZE = 2;

function isValidValue(value: Readonly<string | undefined>): value is string {
  return _.isString(value) && !_.isEmpty(value);
}

function getFlagValue(flags: Readonly<string>[]): string | undefined {
  return _.last(flags);
}

function isFlag(messageFlag: Readonly<IDiscordMessageFlag>): boolean {
  return discordCommandIsMessageFlag(messageFlag);
}

function separateFlagNameFromValue(
  messageFlag: Readonly<IDiscordMessageFlag>
): string[] {
  return _.split(messageFlag, `=`);
}

function hasValue(splittedFlag: Readonly<string>[]): boolean {
  const splittedFlagSize: number = _.size(splittedFlag);

  return _.isEqual(splittedFlagSize, FLAG_SIZE);
}

/**
 * @description
 * Extract the flag value from a message flag
 *
 * @example
 * discordCommandGetFlagValue('')          => null
 * discordCommandGetFlagValue('-f')        => null
 * discordCommandGetFlagValue('-f=')       => null
 * discordCommandGetFlagValue('-f=dummy')  => null
 * discordCommandGetFlagValue('--f')       => null
 * discordCommandGetFlagValue('--f=')      => null
 * discordCommandGetFlagValue('--f=dummy') => dummy
 *
 * @param {Readonly<IDiscordMessageFlag>} messageFlag A flag as a message
 *
 * @return {string | null} a string when the flag value exists
 */
export function discordCommandGetFlagValue(
  messageFlag: Readonly<IDiscordMessageFlag>
): string | null {
  if (isFlag(messageFlag)) {
    const splittedFlag: string[] = separateFlagNameFromValue(messageFlag);

    if (hasValue(splittedFlag)) {
      const flagValue: string | undefined = getFlagValue(splittedFlag);

      if (isValidValue(flagValue)) {
        return flagValue;
      }
    }
  }

  return null;
}
