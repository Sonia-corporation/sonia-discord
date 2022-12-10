import { FirebaseDmFeatureVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-version.enum';

/**
 * @description
 * A simple Firebase DM feature with the default configuration.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface INewFirebaseDmFeature {
  version: FirebaseDmFeatureVersionEnum.V1;
}
