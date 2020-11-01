import _ from "lodash";
import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { IDiscordCommandFlagResponse } from "../../../types/commands/flags/discord-command-flag-response";

/**
 * @description
 * Check either or nor the given value is a Discord command flag success
 * Based on the properties the object has
 *
 * @param {Readonly<IDiscordCommandFlagResponse>} value The value to check
 *
 * @return {boolean} true when a flag
 */
export function discordCommandIsFlagSuccess(
  value: Readonly<IDiscordCommandFlagResponse>
): value is IDiscordCommandFlagSuccess {
  return _.has(value, [`description`]) && _.has(value, [`name`]);
}
