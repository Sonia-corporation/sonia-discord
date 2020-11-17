import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordGetCommandWithFirstArgumentRegexpData {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
