import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";

export const DISCORD_PRESENCE_ACTIVITY_LISTENING: IDiscordPresenceActivity[] = [
  {
    name: `Spotify`,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: `mom`,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: `dad`,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: `Deezer`,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: `Apple Music`,
    type: DiscordActivityTypeEnum.LISTENING,
  },
];
