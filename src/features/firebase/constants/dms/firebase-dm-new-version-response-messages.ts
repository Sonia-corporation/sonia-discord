import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewVersionResponseEnum } from '../../enums/firebase-new-version-response.enum';
import { IFirebaseDmNewVersionResponseMessage } from '../../interfaces/dms/firebase-dm-new-version-response-message';

export const FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewVersionResponseEnum,
  IFirebaseDmNewVersionResponseMessage
> = new Messages<FirebaseNewVersionResponseEnum, IFirebaseDmNewVersionResponseMessage>({
  defaultMessage: FirebaseNewVersionResponseEnum.COOL,
  messages: FirebaseNewVersionResponseEnum,
});
