import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseGuildNewVersionResponseEnum } from '../../enums/guilds/firebase-guild-new-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseGuildNewVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseGuildNewVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseGuildNewVersionResponseEnum.COOL,
  messages: FirebaseGuildNewVersionResponseEnum,
});
