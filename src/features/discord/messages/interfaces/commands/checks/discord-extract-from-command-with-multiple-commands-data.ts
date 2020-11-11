import { IDiscordExtractFromCommandData } from './discord-extract-from-command-data';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordExtractFromCommandWithMultipleCommandsData
  extends Pick<IDiscordExtractFromCommandData, 'finder' | 'message'> {
  commands: DiscordMessageCommandEnum[];
  prefix: string;
}
