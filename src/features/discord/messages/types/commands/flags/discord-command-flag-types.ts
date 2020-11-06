import { DiscordCommandBooleanFlag } from "../../../classes/commands/flags/discord-command-boolean-flag";
import { DiscordCommandValuelessFlag } from "../../../classes/commands/flags/discord-command-valueless-flag";

export type IDiscordCommandFlagTypes<T extends string> =
  | DiscordCommandBooleanFlag<T>
  | DiscordCommandValuelessFlag<T>;
