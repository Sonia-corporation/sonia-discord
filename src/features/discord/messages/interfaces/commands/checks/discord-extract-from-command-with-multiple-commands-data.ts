import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";
import { IDiscordExtractFromCommandData } from "./discord-extract-from-command-data";

export interface IDiscordExtractFromCommandWithMultipleCommandsData
  extends Pick<IDiscordExtractFromCommandData, "finder" | "message"> {
  commands: DiscordMessageCommandEnum[];
  prefix: string;
}
