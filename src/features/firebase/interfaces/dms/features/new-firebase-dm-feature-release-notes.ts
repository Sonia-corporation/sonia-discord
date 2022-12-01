import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-release-notes-version.enum';

/**
 * @description
 * A simple Firebase DM feature release notes with the default configuration.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface INewFirebaseDmFeatureReleaseNotes {
  isEnabled?: undefined;
  version: FirebaseDmFeatureReleaseNotesVersionEnum.V1;
}
