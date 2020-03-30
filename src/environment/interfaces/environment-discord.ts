import { IEnvironmentDiscordMessage } from "./environment-discord-message";
import { IEnvironmentDiscordSonia } from "./environment-discord-sonia";

export interface IEnvironmentDiscord {
  message: IEnvironmentDiscordMessage;
  sonia?: IEnvironmentDiscordSonia;
}
