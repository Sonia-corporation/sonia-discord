import { MessageAdditions, MessageOptions, SplitOptions } from "discord.js";

export type IDiscordMessageOptions =
  | (MessageOptions & { split: true | SplitOptions })
  | MessageAdditions;
