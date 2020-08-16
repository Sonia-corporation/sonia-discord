import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordGetCommandRegexp {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
