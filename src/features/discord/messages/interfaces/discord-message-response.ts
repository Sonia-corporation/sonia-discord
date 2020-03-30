import { DiscordMessageOptions } from "../types/discord-message-options";

export interface IDiscordMessageResponse {
  options?: DiscordMessageOptions;
  response: string;
}
