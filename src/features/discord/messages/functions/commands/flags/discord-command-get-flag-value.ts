import _ from "lodash";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { discordCommandIsMessageFlag } from "./discord-command-is-message-flag";
import { discordCommandRemoveFlagPrefix } from "./discord-command-remove-flag-prefix";

const SPLITTED_FLAG_LENGTH = 2;

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
  const splittedFlag: string[] = _.split(
    discordCommandRemoveFlagPrefix(messageFlag),
    `=`
  );
  const splittedFlagSize: number = _.size(splittedFlag);

  if (!discordCommandIsMessageFlag(messageFlag)) {
    return null;
  }

  if (_.lt(splittedFlagSize, SPLITTED_FLAG_LENGTH)) {
    return null;
  }

  const flagValue: string | undefined = _.last(splittedFlag);

  return _.isNil(flagValue) || _.isEmpty(flagValue) ? null : flagValue;
}
