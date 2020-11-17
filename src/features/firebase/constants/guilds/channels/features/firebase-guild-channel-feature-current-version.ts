import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';

/**
 * @description
 * This version is used when creating a [Firebase guild channel feature]{@link IFirebaseGuildChannelFeature}
 * This is useful to define which type of object is the guild channel feature in the Firebase store
 *
 * Basically instead of altering each guild channel in the store when a new breaking change is released
 * The model should be upgraded before manipulating it
 * Each change should be followed with a breaking change strategy
 */
export const FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION: FirebaseGuildChannelFeatureVersionEnum.V1 =
  FirebaseGuildChannelFeatureVersionEnum.V1;
