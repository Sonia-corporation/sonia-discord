import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewFeaturesVersionResponseEnum } from '../../enums/firebase-new-features-version-response.enum';
import { IFirebaseDmNewVersionResponseMessage } from '../../interfaces/dms/firebase-dm-new-version-response-message';

export const FIREBASE_DM_NEW_FEATURES_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewFeaturesVersionResponseEnum,
  IFirebaseDmNewVersionResponseMessage
> = new Messages<FirebaseNewFeaturesVersionResponseEnum, IFirebaseDmNewVersionResponseMessage>({
  defaultMessage: FirebaseNewFeaturesVersionResponseEnum.ENJOY_THIS_NEW_FEATURE,
  messages: FirebaseNewFeaturesVersionResponseEnum,
});
