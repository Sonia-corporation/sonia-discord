import { IDiscordMessageCommandConfig } from './discord-message-command-config';
import { IDiscordMessageErrorConfig } from './discord-message-error-config';

export interface IDiscordMessageConfig {
  command: IDiscordMessageCommandConfig;
  error: IDiscordMessageErrorConfig;
}
