import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
