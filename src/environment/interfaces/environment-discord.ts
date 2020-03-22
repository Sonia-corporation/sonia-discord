import { IEnvironmentDiscordCommands } from './environment-discord-commands';

export interface IEnvironmentDiscord {
  botSecretToken: string;
  botId: string;
  commands?: IEnvironmentDiscordCommands;
}
