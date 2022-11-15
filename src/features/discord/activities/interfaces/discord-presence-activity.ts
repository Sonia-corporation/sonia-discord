import { DiscordActivityNameEnum } from '../enums/discord-activity-name.enum';
import { ActivityOptions } from 'discord.js';

export interface IDiscordPresenceActivity extends ActivityOptions {
  readonly name?: DiscordActivityNameEnum;
}
