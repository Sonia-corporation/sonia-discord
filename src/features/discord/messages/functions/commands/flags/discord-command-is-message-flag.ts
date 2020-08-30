import _ from "lodash";

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
 * @param {Readonly<string>} messageFlag The message containing a flag
 *
 * @return {boolean} true when a flag
 */
export function discordCommandIsMessageFlag(
  messageFlag: Readonly<string>
): boolean {
  return _.startsWith(messageFlag, `--`);
}
