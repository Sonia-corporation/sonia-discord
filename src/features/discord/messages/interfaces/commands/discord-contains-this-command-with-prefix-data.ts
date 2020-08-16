import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordContainsThisCommandWithPrefixData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefix: string;
}
