import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";

export interface IDiscordGetCommandFirstArgumentData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string | string[];
}
