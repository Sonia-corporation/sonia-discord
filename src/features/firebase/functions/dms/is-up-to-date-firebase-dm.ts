import { FIREBASE_DM_CURRENT_VERSION } from '../../constants/dms/firebase-dm-current-version';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';
import _ from 'lodash';

export function isUpToDateFirebaseDm(firebaseDm: IFirebaseDm): firebaseDm is IFirebaseDmVFinal {
  return _.isEqual(firebaseDm.version, FIREBASE_DM_CURRENT_VERSION);
}
