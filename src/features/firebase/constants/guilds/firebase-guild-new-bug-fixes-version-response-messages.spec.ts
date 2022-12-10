import { FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES } from './firebase-guild-new-bug-fixes-version-response-messages';
import { Messages } from '../../../discord/messages/classes/messages';
import { FirebaseNewBugFixesVersionResponseEnum } from '../../enums/firebase-new-bug-fixes-version-response.enum';

describe(`FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES`, (): void => {
  it(`should be a messages of Firebase guild new bug fixes version responses`, (): void => {
    expect.assertions(1);

    expect(FIREBASE_GUILD_NEW_BUG_FIXES_VERSION_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<FirebaseNewBugFixesVersionResponseEnum>({
        defaultMessage: FirebaseNewBugFixesVersionResponseEnum.SORRY_I_WAS_A_MESS,
        messages: FirebaseNewBugFixesVersionResponseEnum,
      })
    );
  });
});
