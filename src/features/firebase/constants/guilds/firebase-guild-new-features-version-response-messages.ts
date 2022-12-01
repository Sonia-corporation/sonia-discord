import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewFeaturesVersionResponseEnum } from '../../enums/firebase-new-features-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewFeaturesVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseNewFeaturesVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseNewFeaturesVersionResponseEnum.ENJOY_THIS_NEW_FEATURE,
  messages: FirebaseNewFeaturesVersionResponseEnum,
});
