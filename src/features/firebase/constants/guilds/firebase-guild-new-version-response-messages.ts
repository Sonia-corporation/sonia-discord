import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseGuildNewVersionResponseEnum } from '../../enums/guilds/firebase-guild-new-version-response.enum';

export const FIREBASE_GUILD_NEW_VERSION_RESPONSE_MESSAGES: Messages<FirebaseGuildNewVersionResponseEnum> = new Messages<FirebaseGuildNewVersionResponseEnum>(
  {
    defaultMessage: FirebaseGuildNewVersionResponseEnum.COOL,
    messages: FirebaseGuildNewVersionResponseEnum,
  }
);
