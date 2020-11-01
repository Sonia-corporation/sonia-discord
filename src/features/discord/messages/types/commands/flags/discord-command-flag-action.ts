import { DiscordCommandFlagActionBoolean } from "../../../classes/commands/flags/discord-command-flag-action-boolean";
import { DiscordCommandFlagActionValueless } from "../../../classes/commands/flags/discord-command-flag-action-valueless";

export type IDiscordCommandFlagAction =
  | DiscordCommandFlagActionBoolean
  | DiscordCommandFlagActionValueless;
