import { IFirebaseGuild } from '../../../types/guilds/firebase-guild';
import { Snowflake } from 'discord.js';

export type IFirebaseGuildState = IFirebaseGuild & {
  /**
   * @description
   * The Discord guild id.
   */
  id: Snowflake;
};
