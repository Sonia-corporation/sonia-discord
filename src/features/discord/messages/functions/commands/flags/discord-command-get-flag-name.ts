import _ from "lodash";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { discordCommandRemoveFlagPrefix } from "./discord-command-remove-flag-prefix";

/**
 * @description
 * Extract the flag name from a message flag
 *
 * @example
 * discordCommandGetFlagName('')          => null
 * discordCommandGetFlagName('-f')        => f
 * discordCommandGetFlagName('-f=')       => f
 * discordCommandGetFlagName('-f=dummy')  => f
 * discordCommandGetFlagName('--f')       => f
 * discordCommandGetFlagName('--f=')      => f
 * discordCommandGetFlagName('--f=dummy') => f
 *
 * @param {Readonly<IDiscordMessageFlag>} messageFlag A flag as a message
 * @param {Readonly<boolean>} toLowerCase Return the flag name to lower case
 *
 * @return {string | null} a string when the flag name exists
 */
export function discordCommandGetFlagName(
  messageFlag: Readonly<IDiscordMessageFlag>,
  toLowerCase: Readonly<boolean> = false
): string | null {
  const flagName: string | undefined = _.head(
    _.split(discordCommandRemoveFlagPrefix(messageFlag), `=`)
  );

  return _.isNil(flagName) || _.isEmpty(flagName)
    ? null
    : _.isEqual(toLowerCase, true)
    ? _.toLower(flagName)
    : flagName;
}
