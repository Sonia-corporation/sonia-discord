import _ from "lodash";

/**
 * @description
 * Return the flag message without the flag prefix "-" or "--"
 *
 * @example
 * discordCommandRemoveFlagPrefix('')      => ''
 * discordCommandRemoveFlagPrefix('dummy') => dummy
 * discordCommandRemoveFlagPrefix('-f')    => f
 * discordCommandRemoveFlagPrefix('--f')   => f
 *
 * @param {Readonly<string>} messageFlag A flag as a message
 *
 * @return {string} The flag message without the flag prefix "-" or "--"
 */
export function discordCommandRemoveFlagPrefix(
  messageFlag: Readonly<string>
): string {
  return _.trimStart(messageFlag, `--`);
}
