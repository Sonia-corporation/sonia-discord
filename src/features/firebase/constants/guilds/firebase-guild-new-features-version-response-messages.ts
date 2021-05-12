import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseGuildNewFeaturesVersionResponseEnum } from '../../enums/guilds/firebase-guild-new-features-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseGuildNewFeaturesVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseGuildNewFeaturesVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseGuildNewFeaturesVersionResponseEnum.ENJOY_THIS_NEW_FEATURE,
  messages: FirebaseGuildNewFeaturesVersionResponseEnum,
});
