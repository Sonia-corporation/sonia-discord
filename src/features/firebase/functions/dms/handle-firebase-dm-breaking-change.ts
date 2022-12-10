import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase DM]{@link IFirebaseDm}.
 * Based on the [version]{@link IFirebaseDm#version}.
 * @param   {IFirebaseDm} firebaseDm The [Firebase DM]{@link IFirebaseDm} to update.
 * @returns {IFirebaseDm}            Updated [Firebase DM]{@link IFirebaseDm}.
 */
export function handleFirebaseDmBreakingChange(firebaseDm: IFirebaseDm): IFirebaseDmVFinal | never {
  if (firebaseDm.version === FirebaseDmVersionEnum.V1) {
    return firebaseDm;
  }

  throw new Error(`Firebase DM version not valid`);
}
