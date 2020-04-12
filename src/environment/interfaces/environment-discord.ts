import { IEnvironmentDiscordMessage } from "~app/environment/interfaces/environment-discord-message";
import { IEnvironmentDiscordSonia } from "~app/environment/interfaces/environment-discord-sonia";

export interface IEnvironmentDiscord {
  message: IEnvironmentDiscordMessage;
  sonia?: IEnvironmentDiscordSonia;
}
