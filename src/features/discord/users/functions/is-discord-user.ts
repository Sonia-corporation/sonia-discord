import { User } from "discord.js";

export function isDiscordUser(user: unknown): user is User {
  return user instanceof User;
}
