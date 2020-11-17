import { IDiscordExtractFromCommandCallbackData } from './discord-extract-from-command-callback-data';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordExtractFromCommandData {
  commands: DiscordMessageCommandEnum | DiscordMessageCommandEnum[];
  finder: (data: Readonly<IDiscordExtractFromCommandCallbackData>) => string | null;
  message: string;
  prefixes: string | string[];
}
