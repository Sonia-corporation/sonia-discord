import { FirebaseDmFeatureVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-version.enum';

/**
 * @description
 * This version is used when creating a [Firebase DM feature]{@link IFirebaseDmFeature}.
 * This is useful to define which type of object is the DM feature in the Firebase store.
 * Basically instead of altering each DM in the store when a new breaking change is released,
 * the model should be upgraded before manipulating it.
 * Each change should be followed with a breaking change strategy.
 */
export const FIREBASE_DM_FEATURE_CURRENT_VERSION: FirebaseDmFeatureVersionEnum.V1 = FirebaseDmFeatureVersionEnum.V1;
