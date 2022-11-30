import { IAnyDiscordMessage } from '../types/any-discord-message';
import { IDiscordMessageOptions } from '../types/discord-message-options';
import { Message } from 'discord.js';

export interface IDiscordMessageResponse {
  /**
   * @description
   * Callback executed once a message has been sent.
   */
  readonly afterSending?: (anyDiscordMessage: IAnyDiscordMessage, message: Message) => Promise<void>;
  content?: string;
  readonly options: IDiscordMessageOptions;
}
