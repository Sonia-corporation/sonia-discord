import { FIREBASE_DM_FEATURE_CURRENT_VERSION } from '../../constants/dms/features/firebase-dm-feature-current-version';
import { FIREBASE_DM_CURRENT_VERSION } from '../../constants/dms/firebase-dm-current-version';
import { ICreateFirebaseDm } from '../../interfaces/dms/create-firebase-dm';
import { INewFirebaseDm } from '../../interfaces/dms/new-firebase-dm';

/**
 * @description
 * Create a Firebase DM directly on the latest version possible.
 * This will include the default configuration.
 * @param   {ICreateFirebaseDm} DM Default DM data.
 * @returns {INewFirebaseDm}       A simple Firebase DM.
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-001}.
 */
export function createFirebaseDm({ id }: ICreateFirebaseDm): INewFirebaseDm {
  return {
    features: {
      version: FIREBASE_DM_FEATURE_CURRENT_VERSION,
    },
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FIREBASE_DM_CURRENT_VERSION,
  };
}
