import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";
import { IDiscordExtractFromCommandData } from "./discord-extract-from-command-data";

export interface IDiscordExtractFromCommandWithMultiplePrefixesData
  extends Pick<IDiscordExtractFromCommandData, "finder" | "message"> {
  command: DiscordMessageCommandEnum;
  prefixes: string[];
}
