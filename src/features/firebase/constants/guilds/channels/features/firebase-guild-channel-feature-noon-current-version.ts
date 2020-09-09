/**
 * @description
 * This version is used when creating a [Firebase guild channel feature noon]{@link IFirebaseGuildChannelFeatureNoon}
 * This is useful to define which type of object is the guild channel feature noon in the Firebase store
 *
 * Basically instead of altering each guild channel in the store when a new breaking change is released
 * The model should be upgraded before manipulating it
 * Each change should be followed with a breaking change strategy
 */
import { FirebaseGuildChannelFeatureNoonVersionEnum } from "../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum";

export const FIREBASE_GUILD_CHANNEL_FEATURE_NOON_CURRENT_VERSION: FirebaseGuildChannelFeatureNoonVersionEnum.V1 =
  FirebaseGuildChannelFeatureNoonVersionEnum.V1;
