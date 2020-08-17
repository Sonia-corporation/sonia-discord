import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordExtractFromCommandCallbackData } from "./discord-extract-from-command-callback-data";

export interface IDiscordExtractFromCommandData {
  callback: (
    data: Readonly<IDiscordExtractFromCommandCallbackData>
  ) => string | null;
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string | string[];
}
