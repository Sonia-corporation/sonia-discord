import { MessageAdditions, MessageOptions, SplitOptions } from "discord.js";

export type DiscordMessageOptions =
  | (MessageOptions & { split: true | SplitOptions })
  | MessageAdditions;
