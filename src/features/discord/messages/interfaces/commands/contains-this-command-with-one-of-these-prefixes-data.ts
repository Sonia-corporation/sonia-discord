import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";

export interface IContainsThisCommandWithOneOfThesePrefixesData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string[];
}
