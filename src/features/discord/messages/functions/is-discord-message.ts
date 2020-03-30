import { Message } from "discord.js";

export function isDiscordMessage(message: unknown): message is Message {
  return message instanceof Message;
}
