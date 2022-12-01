import { IFirebaseGuildChannelFeatureV1 } from './features/firebase-guild-channel-feature-v1';
import { FirebaseGuildChannelVersionEnum } from '../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { Snowflake } from 'discord.js';

/**
 * @description
 * The model of the Firebase guild channel v1.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface IFirebaseGuildChannelV1 {
  /**
   * @description
   * Used to store the configuration of each Sonia feature.
   * Related to the feature command, obviously.
   */
  features?: IFirebaseGuildChannelFeatureV1 | undefined;

  /**
   * @description
   * The Discord channel id.
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseGuildChannelVersionEnum.V1 | undefined;
}
