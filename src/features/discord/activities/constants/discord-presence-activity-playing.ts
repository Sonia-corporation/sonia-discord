import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";
import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";

export const DISCORD_PRESENCE_ACTIVITY_PLAYING: IDiscordPresenceActivity[] = [
  {
    name: DiscordActivityNameEnum.GOD,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: DiscordActivityNameEnum.WEB_STORM,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: DiscordActivityNameEnum.GRAND_THEFT_AUTO_V,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: DiscordActivityNameEnum.COUNTER_STRIKE_GLOBAL_OFFENSIVE,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: DiscordActivityNameEnum.MINECRAFT,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: DiscordActivityNameEnum.WORLD_OF_WARCRAFT,
    type: DiscordActivityTypeEnum.PLAYING,
  },
];
