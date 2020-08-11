import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IContainsThisCommandWithPrefixData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefix: string;
}
