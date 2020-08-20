import { Snowflake } from "discord.js";

export function wrapUserIdIntoMention(userId: Readonly<Snowflake>): string {
  return `<@!${userId}>`;
}
