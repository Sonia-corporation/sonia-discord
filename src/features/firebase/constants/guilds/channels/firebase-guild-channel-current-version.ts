import { FirebaseGuildChannelVersionEnum } from '../../../enums/guilds/channels/firebase-guild-channel-version.enum';

/**
 * @description
 * This version is used when creating a [Firebase guild channel]{@link IFirebaseGuildChannel}
 * This is useful to define which type of object is the guild channel in the Firebase store
 *
 * Basically instead of altering each guild channel in the store when a new breaking change is released
 * The model should be upgraded before manipulating it
 * Each change should be followed with a breaking change strategy
 */
export const FIREBASE_GUILD_CHANNEL_CURRENT_VERSION: FirebaseGuildChannelVersionEnum.V2 =
  FirebaseGuildChannelVersionEnum.V2;
