import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordHasThisCommandData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  message: string;
  prefixes: string | string[];
}
