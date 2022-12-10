import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewVersionResponseEnum } from '../../enums/firebase-new-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseNewVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseNewVersionResponseEnum.COOL,
  messages: FirebaseNewVersionResponseEnum,
});
