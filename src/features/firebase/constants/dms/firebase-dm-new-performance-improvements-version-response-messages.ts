import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewPerformanceImprovementsVersionResponseEnum } from '../../enums/firebase-new-performance-improvements-version-response.enum';
import { IFirebaseDmNewVersionResponseMessage } from '../../interfaces/dms/firebase-dm-new-version-response-message';

export const FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewPerformanceImprovementsVersionResponseEnum,
  IFirebaseDmNewVersionResponseMessage
> = new Messages<FirebaseNewPerformanceImprovementsVersionResponseEnum, IFirebaseDmNewVersionResponseMessage>({
  defaultMessage: FirebaseNewPerformanceImprovementsVersionResponseEnum.SPEED_IS_EVERYTHING,
  messages: FirebaseNewPerformanceImprovementsVersionResponseEnum,
});
