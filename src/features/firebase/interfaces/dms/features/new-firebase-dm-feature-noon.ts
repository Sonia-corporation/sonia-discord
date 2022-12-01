import { FirebaseDmFeatureNoonVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-noon-version.enum';

/**
 * @description
 * A simple Firebase DM feature release notes with the default configuration.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface INewFirebaseDmFeatureNoon {
  isEnabled?: undefined;
  version: FirebaseDmFeatureNoonVersionEnum.V1;
}
