import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordExtractFromCommandCallbackData {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}
