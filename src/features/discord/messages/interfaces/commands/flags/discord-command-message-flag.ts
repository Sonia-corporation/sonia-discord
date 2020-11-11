import { IDiscordCommandFlagTypes } from "../../../types/commands/flags/discord-command-flag-types";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";

export interface IDiscordCommandMessageFlag<T extends string> {
  flag: IDiscordCommandFlagTypes<T>;
  messageFlag: IDiscordMessageFlag;
}
