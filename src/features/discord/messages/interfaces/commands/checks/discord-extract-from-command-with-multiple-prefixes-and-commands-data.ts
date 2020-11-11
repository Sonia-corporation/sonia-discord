import { IDiscordExtractFromCommandData } from './discord-extract-from-command-data';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordExtractFromCommandWithMultiplePrefixesAndCommandsData extends IDiscordExtractFromCommandData {
  commands: DiscordMessageCommandEnum[];
  prefixes: string[];
}
