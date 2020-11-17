import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordGetCommandWithPrefix {
  command: DiscordMessageCommandEnum;
  prefix: string;
}
