import { Guild } from 'discord.js';

/**
 * @param guild
 */
export function isDiscordGuild(guild: unknown): guild is Guild {
  return guild instanceof Guild;
}
