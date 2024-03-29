import { FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES } from './firebase-guild-new-performance-improvements-version-response-messages';
import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewPerformanceImprovementsVersionResponseEnum } from '../../enums/firebase-new-performance-improvements-version-response.enum';
import { IFirebaseGuildNewVersionResponseMessage } from '../../interfaces/guilds/firebase-guild-new-version-response-message';

describe(`FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES`, (): void => {
  it(`should be a messages of Firebase guild new performance improvements version responses`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_GUILD_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<FirebaseNewPerformanceImprovementsVersionResponseEnum, IFirebaseGuildNewVersionResponseMessage>({
        defaultMessage: FirebaseNewPerformanceImprovementsVersionResponseEnum.SPEED_IS_EVERYTHING,
        messages: FirebaseNewPerformanceImprovementsVersionResponseEnum,
      })
    );
  });
});
