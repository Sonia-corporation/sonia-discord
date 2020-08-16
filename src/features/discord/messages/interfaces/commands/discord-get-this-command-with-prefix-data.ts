import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordGetThisCommandWithPrefixData {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}
