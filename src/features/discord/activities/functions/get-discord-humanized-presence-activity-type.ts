import { IDiscordHumanizedPresenceActivityType } from '../interfaces/discord-humanized-presence-activity-type';
import { ActivityType } from 'discord.js';

const MAP: Record<ActivityType, IDiscordHumanizedPresenceActivityType> = {
  0: `playing`,
  1: `streaming`,
  2: `listening`,
  3: `watching`,
  4: `custom`,
  5: `competing`,
};

export function getDiscordHumanizedPresenceActivityType(
  activityType: ActivityType
): IDiscordHumanizedPresenceActivityType {
  return MAP[activityType];
}
