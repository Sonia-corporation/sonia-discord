import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";

export interface IDiscordGetCommandFlagsData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string | string[];
}
