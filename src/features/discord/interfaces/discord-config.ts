import { IDiscordCommandsConfig } from './discord-commands-config';

export interface IDiscordConfig {
  botSecretToken: string;
  botId: string;
  commands: IDiscordCommandsConfig;
}
