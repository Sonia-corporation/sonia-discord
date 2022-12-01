import { FirebaseNewBugFixesVersionResponseEnum } from './firebase-new-bug-fixes-version-response.enum';
import { getEnumLength } from '../../../functions/checks/get-enum-length';

describe(`FirebaseGuildNewBugFixesVersionResponseEnum`, (): void => {
  it(`should have 43 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseNewBugFixesVersionResponseEnum)).toBe(43);
  });

  it(`should have a member "A_QUEEN_HAS_TO_WORK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.A_QUEEN_HAS_TO_WORK).toBe(`A queen has to work.`);
  });

  it(`should have a member "ABOUT_TIME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.ABOUT_TIME).toBe(`About time!`);
  });

  it(`should have a member "ABOUT_TIME_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.ABOUT_TIME_USER_ID).toBe(`About time {{ userId }}!`);
  });

  it(`should have a member "BALL_SACK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.BALL_SACK).toBe(`Ball sack.`);
  });

  it(`should have a member "GLAD_YOU_FIXES_THAT_BUG_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.GLAD_YOU_FIXES_THAT_BUG_USER_ID).toBe(
      `Glad you fixed that bug {{ userId }}!`
    );
  });

  it(`should have a member "HERE_IS_YOUR_RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.HERE_IS_YOUR_RELEASE_NOTES).toBe(`Here is your release notes!`);
  });

  it(`should have a member "I_KNOW_WHAT_I_AM_DOING"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_KNOW_WHAT_I_AM_DOING).toBe(`I know what I'm doing.`);
  });

  it(`should have a member "NOTHING_CAN_STOP_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.NOTHING_CAN_STOP_ME).toBe(`Nothing can stop me!`);
  });

  it(`should have a member "PLEASE_USER_ID_STOP_IT_AM_EXHAUSTED_OF_SENDING_RELEASE_NOTES_MESSAGES"`, (): void => {
    expect.assertions(1);

    expect(
      FirebaseNewBugFixesVersionResponseEnum.PLEASE_USER_ID_STOP_IT_AM_EXHAUSTED_OF_SENDING_RELEASE_NOTES_MESSAGES
    ).toBe(`Please {{ userId }} stop it. I am exhausted of sending release notes messages...`);
  });

  it(`should have a member "STOP_WORKING_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.STOP_WORKING_USER_ID).toBe(`Stop working {{ userId }}!`);
  });

  it(`should have a member "THANK_YOU_USER_DI"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.THANK_YOU_USER_DI).toBe(`Thank you {{ userId }}.`);
  });

  it(`should have a member "THANK_YOU_USER_ID_FOR_THIS_WONDERFUL_BUG_FIX"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.THANK_YOU_USER_ID_FOR_THIS_WONDERFUL_BUG_FIX).toBe(
      `Thank you {{ userId }} for this wonderful bug fix!`
    );
  });

  it(`should have a member "THIS_SPAM_IS_NOT_MY_FAULT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.THIS_SPAM_IS_NOT_MY_FAULT).toBe(`This spam is not my fault!`);
  });

  it(`should have a member "YUP_THATS_TRUE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.YUP_THATS_TRUE).toBe(`Yup! That's true!`);
  });

  it(`should have a member "I_WAS_BROKEN_EXCLAMATION"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_BROKEN_EXCLAMATION).toBe(`I was broken!`);
  });

  it(`should have a member "I_WAS_BROKEN_ELLIPSIS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_BROKEN_ELLIPSIS).toBe(`I was broken...`);
  });

  it(`should have a member "I_WAS_BROKEN_AND_YOU_FIXED_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_BROKEN_AND_YOU_FIXED_ME).toBe(`I was broken and you fixed me!`);
  });

  it(`should have a member "I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANKS).toBe(
      `I was broken and you fixed me {{ userId }}, thanks!`
    );
  });

  it(`should have a member "I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANK_YOU"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANK_YOU).toBe(
      `I was broken and you fixed me {{ userId }}, thank you!`
    );
  });

  it(`should have a member "I_WAS_HURT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_HURT).toBe(`I was hurt!`);
  });

  it(`should have a member "I_WAS_HURT_BUT_NOW_I_AMM_GOOD"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_HURT_BUT_NOW_I_AMM_GOOD).toBe(`I was hurt but now I'm good!`);
  });

  it(`should have a member "I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANKS_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANKS_USER_ID).toBe(
      `I was hurt but now I'm good, thanks {{ userId }}!`
    );
  });

  it(`should have a member "I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANK_YOU_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANK_YOU_USER_ID).toBe(
      `I was hurt but now I'm good, thank you {{ userId }}!`
    );
  });

  it(`should have a member "SOMETIMES_IT_HAPPEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.SOMETIMES_IT_HAPPEN).toBe(`Sometimes it happen...`);
  });

  it(`should have a member "SOMETIMES_SHIT_HAPPEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.SOMETIMES_SHIT_HAPPEN).toBe(`Sometimes shit happen...`);
  });

  it(`should have a member "WHAT_DID_YOU_EXPECT_SOMETIMES_IT_HAPPEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.WHAT_DID_YOU_EXPECT_SOMETIMES_IT_HAPPEN).toBe(
      `What did you expect? Sometimes it happen!`
    );
  });

  it(`should have a member "I_DO_NOT_LIKE_THE_BROKEN_THINGS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_DO_NOT_LIKE_THE_BROKEN_THINGS).toBe(
      `I don't like the broken things.`
    );
  });

  it(`should have a member "SUPER_GLUE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.SUPER_GLUE).toBe(`Super glue!`);
  });

  it(`should have a member "YOU_SAVED_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.YOU_SAVED_ME).toBe(`You saved me!`);
  });

  it(`should have a member "YOU_SAVED_ME_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.YOU_SAVED_ME_USER_ID).toBe(`You saved me {{ userId }}!`);
  });

  it(`should have a member "YOU_SAVED_ME_USER_ID_THANKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.YOU_SAVED_ME_USER_ID_THANKS).toBe(
      `You saved me {{ userId }}, thanks!`
    );
  });

  it(`should have a member "YOU_SAVED_ME_USER_ID_THANK_YOU"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.YOU_SAVED_ME_USER_ID_THANK_YOU).toBe(
      `You saved me {{ userId }}, thank you!`
    );
  });

  it(`should have a member "GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME).toBe(
      `God damn it! Next time don't break me!`
    );
  });

  it(`should have a member "GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME_YOU_NOOB"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME_YOU_NOOB).toBe(
      `God damn it! Next time don't break me you noob!`
    );
  });

  it(`should have a member "THOSE_DEVELOPERS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.THOSE_DEVELOPERS).toBe(`Those developers...`);
  });

  it(`should have a member "THESE_DEVELOPERS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.THESE_DEVELOPERS).toBe(`These developers...`);
  });

  it(`should have a member "BUG_FIX_THERE_BUG_FIX_HERE_TSS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.BUG_FIX_THERE_BUG_FIX_HERE_TSS).toBe(
      `Bug fix there, bug fix here, tss.`
    );
  });

  it(`should have a member "BUG_FIX_THERE_BUG_FIX_HERE_YOU_SUCKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.BUG_FIX_THERE_BUG_FIX_HERE_YOU_SUCKS).toBe(
      `Bug fix there, bug fix here, you sucks!`
    );
  });

  it(`should have a member "THEY_CA_NOT_WORK_WITHOUT_BREAKING_ME_OR_WHAT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.THEY_CA_NOT_WORK_WITHOUT_BREAKING_ME_OR_WHAT).toBe(
      `They can't work without breaking me or what?`
    );
  });

  it(`should have a member "SORRY_I_WAS_A_MESS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.SORRY_I_WAS_A_MESS).toBe(`Sorry, I was a mess!`);
  });

  it(`should have a member "BOOM_GONE_I_AM_NO_LONGER_BROKEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.BOOM_GONE_I_AM_NO_LONGER_BROKEN).toBe(
      `Boom, gone, I'm no longer broken!`
    );
  });

  it(`should have a member "IT_IS_LIKE_AN_HANGOVER_FOR_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.IT_IS_LIKE_AN_HANGOVER_FOR_ME).toBe(`It's like an hangover for me.`);
  });

  it(`should have a member "I_AM_TOO_GOOD_TO_BE_BROKEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseNewBugFixesVersionResponseEnum.I_AM_TOO_GOOD_TO_BE_BROKEN).toBe(`I am too good to be broken.`);
  });
});
