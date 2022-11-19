import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';

/**
 * @description
 * This version is used when creating a [Firebase guild channel feature release notes]{@link IFirebaseGuildChannelFeatureReleaseNotes}.
 * This is useful to define which type of object is the guild channel feature release notes in the Firebase store.
 * Basically instead of altering each guild channel in the store when a new breaking change is released,
 * the model should be upgraded before manipulating it.
 * Each change should be followed with a breaking change strategy.
 */
export const FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1 =
  FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1;
