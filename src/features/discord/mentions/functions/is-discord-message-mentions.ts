import { MessageMentions } from 'discord.js';

export function isDiscordMessageMentions(mention: unknown): boolean {
  return mention instanceof MessageMentions;
}
