import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordStrictlyContainsThisCommandWithPrefixData {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}
