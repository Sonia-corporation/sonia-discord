import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";

export interface IDiscordGetCommandWithFirstArgumentRegexpData {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
