import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseGuildNewBugFixesVersionResponseEnum } from '../../enums/guilds/firebase-guild-new-bug-fixes-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseGuildNewBugFixesVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseGuildNewBugFixesVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseGuildNewBugFixesVersionResponseEnum.SORRY_I_WAS_A_MESS,
  messages: FirebaseGuildNewBugFixesVersionResponseEnum,
});
