import { DiscordMessageOptions } from '../types/discord-message-options';

export interface IDiscordMessageResponse {
  response: string;
  options?: DiscordMessageOptions;
}
