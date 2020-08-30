import _ from "lodash";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";

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
 * @return {boolean} true when a flag
 */
export function discordCommandIsMessageFlag(
  messageFlag: Readonly<IDiscordMessageFlag>
): boolean {
  return _.startsWith(messageFlag, `--`);
}
