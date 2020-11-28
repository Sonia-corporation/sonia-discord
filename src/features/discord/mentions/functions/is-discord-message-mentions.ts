import { MessageMentions } from 'discord.js';

/**
 * @param mention
 */
export function isDiscordMessageMentions(mention: unknown): mention is MessageMentions {
  return mention instanceof MessageMentions;
}
