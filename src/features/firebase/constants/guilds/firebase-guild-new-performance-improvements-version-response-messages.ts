import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewPerformanceImprovementsVersionResponseEnum } from '../../enums/firebase-new-performance-improvements-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseNewPerformanceImprovementsVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseNewPerformanceImprovementsVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseNewPerformanceImprovementsVersionResponseEnum.SPEED_IS_EVERYTHING,
  messages: FirebaseNewPerformanceImprovementsVersionResponseEnum,
});
