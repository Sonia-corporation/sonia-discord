import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewBugFixesVersionResponseEnum } from '../../enums/firebase-new-bug-fixes-version-response.enum';
import { IFirebaseDmNewVersionResponseMessage } from '../../interfaces/dms/firebase-dm-new-version-response-message';

export const FIREBASE_DM_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewBugFixesVersionResponseEnum,
  IFirebaseDmNewVersionResponseMessage
> = new Messages<FirebaseNewBugFixesVersionResponseEnum, IFirebaseDmNewVersionResponseMessage>({
  defaultMessage: FirebaseNewBugFixesVersionResponseEnum.SORRY_I_WAS_A_MESS,
  messages: FirebaseNewBugFixesVersionResponseEnum,
});
