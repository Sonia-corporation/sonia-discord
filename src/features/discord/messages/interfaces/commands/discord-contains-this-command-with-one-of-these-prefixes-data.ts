import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IDiscordContainsThisCommandWithOneOfThesePrefixesData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string[];
}
