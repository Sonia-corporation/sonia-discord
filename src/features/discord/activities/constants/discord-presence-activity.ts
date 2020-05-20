import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_LISTENING } from "./discord-presence-activity-listening";
import { DISCORD_PRESENCE_ACTIVITY_PLAYING } from "./discord-presence-activity-playing";
import { DISCORD_PRESENCE_ACTIVITY_WATCHING } from "./discord-presence-activity-watching";

export const DISCORD_PRESENCE_ACTIVITY: IDiscordPresenceActivity[] = [
  ...DISCORD_PRESENCE_ACTIVITY_LISTENING,
  ...DISCORD_PRESENCE_ACTIVITY_PLAYING,
  ...DISCORD_PRESENCE_ACTIVITY_WATCHING,
];
