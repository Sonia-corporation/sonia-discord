import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';

/**
 * @description
 * This version is used when creating a [Firebase DM]{@link IFirebaseDm}.
 * This is useful to define which type of object is the DM in the Firebase store.
 * Basically instead of altering each DM in the store when a new breaking change is released,
 * the model should be upgraded before manipulating it.
 * Each change should be followed with a breaking change strategy.
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-001}.
 */
export const FIREBASE_DM_CURRENT_VERSION: FirebaseDmVersionEnum.V1 = FirebaseDmVersionEnum.V1;
