import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";

export interface IDiscordContainsThisCommandWithPrefixData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefix: string;
}
