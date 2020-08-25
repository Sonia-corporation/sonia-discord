import { DiscordMessageCommandEnum } from "../../../enums/command/discord-message-command.enum";

export interface IDiscordGetCommandAndFirstArgumentData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string | string[];
}
