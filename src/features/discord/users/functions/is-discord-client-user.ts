import { ClientUser } from "discord.js";

export function isDiscordClientUser(user: unknown): user is ClientUser {
  return user instanceof ClientUser;
}
