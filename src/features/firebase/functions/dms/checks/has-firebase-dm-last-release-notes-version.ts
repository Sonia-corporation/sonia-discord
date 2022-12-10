import { FirebaseDmVersionEnum } from '../../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmV1 } from '../../../interfaces/dms/firebase-dm-v1';
import { IFirebaseDm } from '../../../types/dms/firebase-dm';
import _ from 'lodash';

/**
 * @description
 * Check if the given Firebase DM contains a [last release notes version]{@link IFirebaseDmV1#lastReleaseNotesVersion}.
 * @param   {IFirebaseDm} firebaseDm The Firebase DM.
 * @returns {boolean}                True when the given DM is at least [v1]{@link FirebaseDmVersionEnum.V1}.
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-001}.
 */
export function hasFirebaseDmLastReleaseNotesVersion(
  firebaseDm: IFirebaseDm
): firebaseDm is IFirebaseDmV1 & { lastReleaseNotesVersion: string } {
  return _.includes([FirebaseDmVersionEnum.V1], firebaseDm.version);
}
