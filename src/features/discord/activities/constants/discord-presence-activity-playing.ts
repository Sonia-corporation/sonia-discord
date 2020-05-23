import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";

export const DISCORD_PRESENCE_ACTIVITY_PLAYING: IDiscordPresenceActivity[] = [
  {
    name: `God`,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: `WebStorm`,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: `Grand Theft Auto V`,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: `Counter-Strike: Global Offensive`,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: `Minecraft`,
    type: DiscordActivityTypeEnum.PLAYING,
  },
  {
    name: `World of Warcraft`,
    type: DiscordActivityTypeEnum.PLAYING,
  },
];
