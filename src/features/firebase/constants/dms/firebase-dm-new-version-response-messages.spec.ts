import { FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES } from './firebase-dm-new-version-response-messages';
import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewVersionResponseEnum } from '../../enums/firebase-new-version-response.enum';

describe(`FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES`, (): void => {
  it(`should be a messages of Firebase DM new version responses`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_DM_NEW_VERSION_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<FirebaseNewVersionResponseEnum>({
        defaultMessage: FirebaseNewVersionResponseEnum.COOL,
        messages: FirebaseNewVersionResponseEnum,
      })
    );
  });
});
