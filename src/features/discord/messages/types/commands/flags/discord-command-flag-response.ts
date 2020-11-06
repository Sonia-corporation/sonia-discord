import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";

export type IDiscordCommandFlagResponse =
  | IDiscordCommandFlagSuccess
  | IDiscordMessageResponse;
