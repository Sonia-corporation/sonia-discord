import { IFirebaseGuildChannelFeatureNoonV1 } from './firebase-guild-channel-feature-noon-v1';
import { IFirebaseGuildChannelFeatureReleaseNotesV1 } from './firebase-guild-channel-feature-release-notes-v1';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';

/**
 * @description
 * The model of the Firebase guild channel feature v2.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface IFirebaseGuildChannelFeatureV2 {
  /**
   * @description
   * Noon feature configuration.
   */
  noon?: IFirebaseGuildChannelFeatureNoonV1 | undefined;

  /**
   * @description
   * Release notes feature configuration.
   */
  releaseNotes?: IFirebaseGuildChannelFeatureReleaseNotesV1 | undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur.
   */
  version?: FirebaseGuildChannelFeatureVersionEnum.V2 | undefined;
}
