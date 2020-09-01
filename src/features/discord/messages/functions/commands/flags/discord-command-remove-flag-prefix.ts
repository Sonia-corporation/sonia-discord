import _ from "lodash";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";

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
 * @param {Readonly<IDiscordMessageFlag>} messageFlag A flag as a message
 *
 * @return {string} The flag message without the flag prefix "-" or "--"
 */
export function discordCommandRemoveFlagPrefix(
  messageFlag: Readonly<IDiscordMessageFlag>
): string {
  return _.trimStart(messageFlag, `--`);
}
