import { IDiscordMessageOptions } from '../types/discord-message-options';

export interface IDiscordMessageResponse {
  content: string;
  readonly options: IDiscordMessageOptions;
}
