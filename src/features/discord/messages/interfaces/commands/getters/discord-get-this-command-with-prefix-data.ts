import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";

export interface IDiscordGetThisCommandWithPrefixData {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}
