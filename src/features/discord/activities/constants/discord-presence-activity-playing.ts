import { DiscordActivityNameEnum } from '../enums/discord-activity-name.enum';
import { IDiscordPresenceActivity } from '../interfaces/discord-presence-activity';
import { ActivityType } from 'discord.js';

export const DISCORD_PRESENCE_ACTIVITY_PLAYING: IDiscordPresenceActivity[] = [
  {
    name: DiscordActivityNameEnum.GOD,
    type: ActivityType.Playing,
  },
  {
    name: DiscordActivityNameEnum.WEB_STORM,
    type: ActivityType.Playing,
  },
  {
    name: DiscordActivityNameEnum.GRAND_THEFT_AUTO_V,
    type: ActivityType.Playing,
  },
  {
    name: DiscordActivityNameEnum.COUNTER_STRIKE_GLOBAL_OFFENSIVE,
    type: ActivityType.Playing,
  },
  {
    name: DiscordActivityNameEnum.MINECRAFT,
    type: ActivityType.Playing,
  },
  {
    name: DiscordActivityNameEnum.WORLD_OF_WARCRAFT,
    type: ActivityType.Playing,
  },
];
