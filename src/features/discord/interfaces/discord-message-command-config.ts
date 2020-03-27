import { IDiscordMessageCommandErrorConfig } from './discord-message-command-error-config';
import { IDiscordMessageCommandVersionConfig } from './discord-message-command-version-config';

export interface IDiscordMessageCommandConfig {
  error: IDiscordMessageCommandErrorConfig;
  prefix: string | string[];
  version: IDiscordMessageCommandVersionConfig;
}
