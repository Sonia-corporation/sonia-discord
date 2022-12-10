import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';

/**
 * @description
 * A simple Firebase guild channel feature release notes with the default configuration.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface INewFirebaseGuildChannelFeatureReleaseNotes {
  isEnabled?: undefined;
  version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1;
}
