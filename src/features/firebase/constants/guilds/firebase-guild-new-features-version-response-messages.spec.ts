import { FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES } from './firebase-guild-new-features-version-response-messages';
import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewFeaturesVersionResponseEnum } from '../../enums/firebase-new-features-version-response.enum';

describe(`FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES`, (): void => {
  it(`should be a messages of Firebase guild new features version responses`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_GUILD_NEW_FEATURES_VERSION_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<FirebaseNewFeaturesVersionResponseEnum>({
        defaultMessage: FirebaseNewFeaturesVersionResponseEnum.ENJOY_THIS_NEW_FEATURE,
        messages: FirebaseNewFeaturesVersionResponseEnum,
      })
    );
  });
});
