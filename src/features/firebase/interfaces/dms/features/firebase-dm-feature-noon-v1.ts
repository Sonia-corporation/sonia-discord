import { FirebaseDmFeatureNoonVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-noon-version.enum';

/**
 * @description
 * The model of the Firebase DM feature noon v1.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface IFirebaseDmFeatureNoonV1 {
  /**
   * @description
   * Enable the message sent at noon.
   */
  isEnabled?: boolean | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseDmFeatureNoonVersionEnum.V1 | undefined;
}
