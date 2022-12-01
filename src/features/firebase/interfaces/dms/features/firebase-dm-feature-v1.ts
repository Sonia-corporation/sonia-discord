import { IFirebaseDmFeatureNoonV1 } from './firebase-dm-feature-noon-v1';
import { IFirebaseDmFeatureReleaseNotesV1 } from './firebase-dm-feature-release-notes-v1';
import { FirebaseDmFeatureVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-version.enum';

/**
 * @description
 * The model of the Firebase DM feature v1.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface IFirebaseDmFeatureV1 {
  /**
   * @description
   * Noon feature configuration.
   */
  noon?: IFirebaseDmFeatureNoonV1 | undefined;

  /**
   * @description
   * Release notes feature configuration.
   */
  releaseNotes?: IFirebaseDmFeatureReleaseNotesV1 | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseDmFeatureVersionEnum.V1 | undefined;
}
