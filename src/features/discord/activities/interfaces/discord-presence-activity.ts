import { DiscordActivityNameEnum } from '../enums/discord-activity-name.enum';
import { ActivityType } from 'discord.js';

export interface IDiscordPresenceActivity {
  name?: DiscordActivityNameEnum;
  type?: ActivityType | number;
  url?: string;
}
