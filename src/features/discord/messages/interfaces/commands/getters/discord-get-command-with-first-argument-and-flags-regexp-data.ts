import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
