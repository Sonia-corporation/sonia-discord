import { IFirebaseGuildChannelV2 } from './channels/firebase-guild-channel-v2';
import { IObject } from '../../../../types/object';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { Snowflake } from 'discord.js';

export interface IFirebaseGuildV5 {
  /**
   * @description
   * A map of channel within the Discord guild
   * Instead of using an array of channels use a map
   * This is better for performances and also will greatly help with nested objects when updating Firebase
   *
   * Updated within the [v4]{@link FirebaseGuildVersionEnum.V4}
   */
  channels?: IObject<IFirebaseGuildChannelV2> | undefined;

  /**
   * @description
   * The Discord guild id
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * Used to store the last release notes version sent on the guild
   * This is useful to avoid sending release notes on each run
   */
  lastReleaseNotesVersion?: string | undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur
   */
  version?: FirebaseGuildVersionEnum.V5 | undefined;
}
