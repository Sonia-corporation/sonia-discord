import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';

export interface IDiscordCommandMessageFlagWithName {
  messageFlag: IDiscordMessageFlag;
  name: string | undefined;
}
