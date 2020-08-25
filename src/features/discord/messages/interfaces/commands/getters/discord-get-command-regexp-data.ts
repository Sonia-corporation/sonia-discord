import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";

export interface IDiscordGetCommandRegexpData {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
