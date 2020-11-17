import { IDiscordExtractFromCommandData } from './discord-extract-from-command-data';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordExtractFromCommandWithMultiplePrefixesData
  extends Pick<IDiscordExtractFromCommandData, 'finder' | 'message'> {
  command: DiscordMessageCommandEnum;
  prefixes: string[];
}
