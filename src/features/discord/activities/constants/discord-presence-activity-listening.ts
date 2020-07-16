import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";
import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";

export const DISCORD_PRESENCE_ACTIVITY_LISTENING: IDiscordPresenceActivity[] = [
  {
    name: DiscordActivityNameEnum.SPOTIFY,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: DiscordActivityNameEnum.MOM,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: DiscordActivityNameEnum.MOMMY,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: DiscordActivityNameEnum.DAD,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: DiscordActivityNameEnum.DADDY,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: DiscordActivityNameEnum.DEEZER,
    type: DiscordActivityTypeEnum.LISTENING,
  },
  {
    name: DiscordActivityNameEnum.APPLE_MUSIC,
    type: DiscordActivityTypeEnum.LISTENING,
  },
];
