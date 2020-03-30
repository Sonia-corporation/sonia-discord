import { Guild } from "discord.js";

export function isDiscordGuild(guild: unknown): guild is Guild {
  return guild instanceof Guild;
}
