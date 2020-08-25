import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";

export interface IDiscordGetCommandRegexpData {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
