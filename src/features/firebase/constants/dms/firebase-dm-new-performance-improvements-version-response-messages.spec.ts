import { FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES } from './firebase-dm-new-performance-improvements-version-response-messages';
import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewPerformanceImprovementsVersionResponseEnum } from '../../enums/firebase-new-performance-improvements-version-response.enum';
import { IFirebaseDmNewVersionResponseMessage } from '../../interfaces/dms/firebase-dm-new-version-response-message';

describe(`FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES`, (): void => {
  it(`should be a messages of Firebase DM new performance improvements version responses`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_DM_NEW_PERFORMANCE_IMPROVEMENTS_VERSION_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<FirebaseNewPerformanceImprovementsVersionResponseEnum, IFirebaseDmNewVersionResponseMessage>({
        defaultMessage: FirebaseNewPerformanceImprovementsVersionResponseEnum.SPEED_IS_EVERYTHING,
        messages: FirebaseNewPerformanceImprovementsVersionResponseEnum,
      })
    );
  });
});
