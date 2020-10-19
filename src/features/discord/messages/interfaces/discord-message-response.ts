import { IDiscordMessageOptions } from "../types/discord-message-options";

export interface IDiscordMessageResponse {
  options: IDiscordMessageOptions;
  response: string;
}
