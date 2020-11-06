import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IDiscordCommandFlagsSuccess } from "../../../types/commands/flags/discord-command-flags-success";

export interface IDiscordCommandSplittedFlagsResponse {
  commandFlagsSuccess: IDiscordCommandFlagsSuccess;
  messageResponses: IDiscordMessageResponse[];
}
