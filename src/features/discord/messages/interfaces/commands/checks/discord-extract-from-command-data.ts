import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";
import { IDiscordExtractFromCommandCallbackData } from "./discord-extract-from-command-callback-data";

export interface IDiscordExtractFromCommandData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  finder: (
    data: Readonly<IDiscordExtractFromCommandCallbackData>
  ) => string | null;
  message: string;
  prefixes: string | string[];
}
