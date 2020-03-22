import { IEnvironmentDiscordMessage } from './environment-discord-message';
import { IEnvironmentDiscordSonia } from './environment-discord-sonia';

export interface IEnvironmentDiscord {
  sonia: IEnvironmentDiscordSonia;
  message?: IEnvironmentDiscordMessage;
}
