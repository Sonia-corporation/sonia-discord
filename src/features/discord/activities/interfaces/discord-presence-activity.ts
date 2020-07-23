import { ActivityType } from "discord.js";
import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";

export interface IDiscordPresenceActivity {
  name?: DiscordActivityNameEnum;
  type?: ActivityType | number;
  url?: string;
}
