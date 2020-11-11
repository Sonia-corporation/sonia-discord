import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';

export interface IDiscordStrictlyContainsThisCommandWithPrefixData {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}
