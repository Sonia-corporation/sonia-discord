import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";

export interface IDiscordGetCommandWithPrefix {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
