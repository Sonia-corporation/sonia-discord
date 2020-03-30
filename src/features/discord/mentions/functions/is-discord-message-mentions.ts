import { MessageMentions } from "discord.js";

export function isDiscordMessageMentions(
  mention: unknown
): mention is MessageMentions {
  return mention instanceof MessageMentions;
}
