import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseGuildNewPerformanceImprovementsVersionResponseEnum } from '../../enums/guilds/firebase-guild-new-performance-improvements-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

export const FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES: Messages<
  FirebaseGuildNewPerformanceImprovementsVersionResponseEnum,
  IFirebaseGuildNewVersionResponseMessage
> = new Messages<FirebaseGuildNewPerformanceImprovementsVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
  defaultMessage: FirebaseGuildNewPerformanceImprovementsVersionResponseEnum.SPEED_IS_EVERYTHING,
  messages: FirebaseGuildNewPerformanceImprovementsVersionResponseEnum,
});
