import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordExtractFromCommandData } from "./discord-extract-from-command-data";

export interface IDiscordExtractFromCommandWithMultiplePrefixesAndCommandsData
  extends IDiscordExtractFromCommandData {
  commands: DiscordMessageCommandEnum[];
  prefixes: string[];
}
