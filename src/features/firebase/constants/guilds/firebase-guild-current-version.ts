import { FirebaseGuildVersionEnum } from "../../enums/guilds/firebase-guild-version.enum";

/**
 * @description
 * This version is used when creating a [Firebase guild]{@link IFirebaseGuild}
 * This is useful to define which type of object is the guild in the Firebase store
 *
 * Basically instead of altering each guild in the store when a new breaking change is released
 * The model should be upgraded before manipulating it
 * Each change should be followed with a breaking change strategy
 *
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-001}
 */
export const FIREBASE_GUILD_CURRENT_VERSION: FirebaseGuildVersionEnum.V4 =
  FirebaseGuildVersionEnum.V4;
