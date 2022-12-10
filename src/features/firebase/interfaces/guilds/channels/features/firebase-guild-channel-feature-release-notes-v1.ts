import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';

/**
 * @description
 * The model of the Firebase guild channel feature release notes v1.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface IFirebaseGuildChannelFeatureReleaseNotesV1 {
  /**
   * @description
   * Enable to send a release notes message.
   */
  isEnabled?: boolean | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1 | undefined;
}
