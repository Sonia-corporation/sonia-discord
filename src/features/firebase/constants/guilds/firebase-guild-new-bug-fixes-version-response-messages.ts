import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewBugFixesVersionResponseEnum } from '../../enums/firebase-new-bug-fixes-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewBugFixesVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseNewBugFixesVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseNewBugFixesVersionResponseEnum.SORRY_I_WAS_A_MESS,
  messages: FirebaseNewBugFixesVersionResponseEnum,
});
