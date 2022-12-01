import { IFirebaseDm } from '../../../types/dms/firebase-dm';
import { Snowflake } from 'discord.js';

export type IFirebaseDmState = IFirebaseDm & {
  /**
   * @description
   * The user id.
   */
  id: Snowflake;
};
