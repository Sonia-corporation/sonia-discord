import { DiscordCommandFirstArgument } from "../../../classes/commands/arguments/discord-command-first-argument";
import { DiscordCommandFlag } from "../../../classes/commands/flags/discord-command-flag";

export interface IDiscordCommandFlags<T extends string> {
  command: DiscordCommandFirstArgument<string>;
  flags: DiscordCommandFlag<T>[];
}
