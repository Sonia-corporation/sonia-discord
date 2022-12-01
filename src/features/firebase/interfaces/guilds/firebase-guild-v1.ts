import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { Snowflake } from 'discord.js';

export interface IFirebaseGuildV1 {
  /**
   * @description
   * The Discord guild id.
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseGuildVersionEnum.V1 | undefined;
}
