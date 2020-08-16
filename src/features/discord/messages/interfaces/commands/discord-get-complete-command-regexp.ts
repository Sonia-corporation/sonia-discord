import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordGetCompleteCommandRegexp {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
