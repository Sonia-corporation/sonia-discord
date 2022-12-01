import { FirebaseDmFeatureVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-version.enum';
import { IFirebaseDmFeature } from '../../../types/dms/features/firebase-dm-feature';
import { IFirebaseDmFeatureVFinal } from '../../../types/dms/features/firebase-dm-feature-v-final';

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase DM feature]{@link IFirebaseDmFeature}.
 * Based on the [version]{@link IFirebaseDmFeature#version}.
 * @param   {IFirebaseDmFeature} firebaseDmFeature The [Firebase DM feature]{@link IFirebaseDmFeature} to update.
 * @returns {IFirebaseDmFeature}                   Updated [Firebase DM feature]{@link IFirebaseDmFeature}.
 */
export function handleFirebaseDmFeatureBreakingChange(
  firebaseDmFeature: IFirebaseDmFeature
): IFirebaseDmFeatureVFinal | never {
  if (firebaseDmFeature.version === FirebaseDmFeatureVersionEnum.V1) {
    return firebaseDmFeature;
  }

  throw new Error(`Firebase DM feature version not valid`);
}
