import { MessageAdditions, MessageOptions } from "discord.js";

export type IDiscordMessageOptions =
  | (MessageOptions & { split?: false })
  | MessageAdditions;
