import { DiscordCommandFirstArgument } from "../../../classes/commands/arguments/discord-command-first-argument";
import { IDiscordCommandFlagTypes } from "../../../types/commands/flags/discord-command-flag-types";

export interface IDiscordCommandFlags<T extends string> {
  command: DiscordCommandFirstArgument<string>;
  flags: IDiscordCommandFlagTypes<T>[];
}
