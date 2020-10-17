import { MessageOptions, SplitOptions } from "discord.js";

export type IDiscordMessageOptions =
  | (MessageOptions & { split?: false })
  | (MessageOptions & { split: true | SplitOptions });
