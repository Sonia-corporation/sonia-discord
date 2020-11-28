import { Message } from 'discord.js';

/**
 * @param message
 */
export function isDiscordMessage(message: unknown): message is Message {
  return message instanceof Message;
}
