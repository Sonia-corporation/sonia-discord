import _ from "lodash";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";

/**
 * @description
 * Split a message containing a list of flags to an array of flags
 *
 * @param {Readonly<string>} messageFlags A partial message containing only a string with flags
 *
 * @return {IDiscordMessageFlag[]} An array of Discord message flag
 */
export function discordCommandSplitMessageFlags(
  messageFlags: Readonly<string>
): IDiscordMessageFlag[] {
  return _.isEmpty(messageFlags) ? [] : _.split(messageFlags, ` `);
}
