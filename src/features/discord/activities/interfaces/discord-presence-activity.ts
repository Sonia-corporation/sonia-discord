import { ActivityType } from "discord.js";

export interface IDiscordPresenceActivity {
  name?: string;
  type?: ActivityType | number;
  url?: string;
}
