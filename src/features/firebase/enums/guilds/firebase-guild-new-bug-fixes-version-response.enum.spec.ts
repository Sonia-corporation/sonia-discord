import { FirebaseGuildNewBugFixesVersionResponseEnum } from './firebase-guild-new-bug-fixes-version-response.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildNewBugFixesVersionResponseEnum`, (): void => {
  it(`should have 43 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildNewBugFixesVersionResponseEnum)).toStrictEqual(43);
  });

  it(`should have a member "A_QUEEN_HAS_TO_WORK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.A_QUEEN_HAS_TO_WORK).toStrictEqual(`A queen has to work.`);
  });

  it(`should have a member "ABOUT_TIME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.ABOUT_TIME).toStrictEqual(`About time!`);
  });

  it(`should have a member "ABOUT_TIME_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.ABOUT_TIME_USER_ID).toStrictEqual(`About time {{ userId }}!`);
  });

  it(`should have a member "BALL_SACK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.BALL_SACK).toStrictEqual(`Ball sack.`);
  });

  it(`should have a member "GLAD_YOU_FIXES_THAT_BUG_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.GLAD_YOU_FIXES_THAT_BUG_USER_ID).toStrictEqual(
      `Glad you fixed that bug {{ userId }}!`
    );
  });

  it(`should have a member "HERE_IS_YOUR_RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.HERE_IS_YOUR_RELEASE_NOTES).toStrictEqual(
      `Here is your release notes!`
    );
  });

  it(`should have a member "I_KNOW_WHAT_I_AM_DOING"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_KNOW_WHAT_I_AM_DOING).toStrictEqual(`I know what I'm doing.`);
  });

  it(`should have a member "NOTHING_CAN_STOP_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.NOTHING_CAN_STOP_ME).toStrictEqual(`Nothing can stop me!`);
  });

  it(`should have a member "PLEASE_USER_ID_STOP_IT_AM_EXHAUSTED_OF_SENDING_RELEASE_NOTES_MESSAGES"`, (): void => {
    expect.assertions(1);

    expect(
      FirebaseGuildNewBugFixesVersionResponseEnum.PLEASE_USER_ID_STOP_IT_AM_EXHAUSTED_OF_SENDING_RELEASE_NOTES_MESSAGES
    ).toStrictEqual(`Please {{ userId }} stop it. I am exhausted of sending release notes messages...`);
  });

  it(`should have a member "STOP_WORKING_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.STOP_WORKING_USER_ID).toStrictEqual(
      `Stop working {{ userId }}!`
    );
  });

  it(`should have a member "THANK_YOU_USER_DI"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.THANK_YOU_USER_DI).toStrictEqual(`Thank you {{ userId }}.`);
  });

  it(`should have a member "THANK_YOU_USER_ID_FOR_THIS_WONDERFUL_BUG_FIX"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.THANK_YOU_USER_ID_FOR_THIS_WONDERFUL_BUG_FIX).toStrictEqual(
      `Thank you {{ userId }} for this wonderful bug fix!`
    );
  });

  it(`should have a member "THIS_SPAM_IS_NOT_MY_FAULT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.THIS_SPAM_IS_NOT_MY_FAULT).toStrictEqual(
      `This spam is not my fault!`
    );
  });

  it(`should have a member "YUP_THATS_TRUE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.YUP_THATS_TRUE).toStrictEqual(`Yup! That's true!`);
  });

  it(`should have a member "I_WAS_BROKEN_EXCLAMATION"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_BROKEN_EXCLAMATION).toStrictEqual(`I was broken!`);
  });

  it(`should have a member "I_WAS_BROKEN_ELLIPSIS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_BROKEN_ELLIPSIS).toStrictEqual(`I was broken...`);
  });

  it(`should have a member "I_WAS_BROKEN_AND_YOU_FIXED_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_BROKEN_AND_YOU_FIXED_ME).toStrictEqual(
      `I was broken and you fixed me!`
    );
  });

  it(`should have a member "I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANKS).toStrictEqual(
      `I was broken and you fixed me {{ userId }}, thanks!`
    );
  });

  it(`should have a member "I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANK_YOU"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_BROKEN_AND_YOU_FIXED_ME_USER_ID_THANK_YOU).toStrictEqual(
      `I was broken and you fixed me {{ userId }}, thank you!`
    );
  });

  it(`should have a member "I_WAS_HURT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_HURT).toStrictEqual(`I was hurt!`);
  });

  it(`should have a member "I_WAS_HURT_BUT_NOW_I_AMM_GOOD"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_HURT_BUT_NOW_I_AMM_GOOD).toStrictEqual(
      `I was hurt but now I'm good!`
    );
  });

  it(`should have a member "I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANKS_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANKS_USER_ID).toStrictEqual(
      `I was hurt but now I'm good, thanks {{ userId }}!`
    );
  });

  it(`should have a member "I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANK_YOU_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_WAS_HURT_BUT_NOW_I_AM_GOOD_THANK_YOU_USER_ID).toStrictEqual(
      `I was hurt but now I'm good, thank you {{ userId }}!`
    );
  });

  it(`should have a member "SOMETIMES_IT_HAPPEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.SOMETIMES_IT_HAPPEN).toStrictEqual(`Sometimes it happen...`);
  });

  it(`should have a member "SOMETIMES_SHIT_HAPPEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.SOMETIMES_SHIT_HAPPEN).toStrictEqual(`Sometimes shit happen...`);
  });

  it(`should have a member "WHAT_DID_YOU_EXPECT_SOMETIMES_IT_HAPPEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.WHAT_DID_YOU_EXPECT_SOMETIMES_IT_HAPPEN).toStrictEqual(
      `What did you expect? Sometimes it happen!`
    );
  });

  it(`should have a member "I_DO_NOT_LIKE_THE_BROKEN_THINGS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_DO_NOT_LIKE_THE_BROKEN_THINGS).toStrictEqual(
      `I don't like the broken things.`
    );
  });

  it(`should have a member "SUPER_GLUE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.SUPER_GLUE).toStrictEqual(`Super glue!`);
  });

  it(`should have a member "YOU_SAVED_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.YOU_SAVED_ME).toStrictEqual(`You saved me!`);
  });

  it(`should have a member "YOU_SAVED_ME_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.YOU_SAVED_ME_USER_ID).toStrictEqual(
      `You saved me {{ userId }}!`
    );
  });

  it(`should have a member "YOU_SAVED_ME_USER_ID_THANKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.YOU_SAVED_ME_USER_ID_THANKS).toStrictEqual(
      `You saved me {{ userId }}, thanks!`
    );
  });

  it(`should have a member "YOU_SAVED_ME_USER_ID_THANK_YOU"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.YOU_SAVED_ME_USER_ID_THANK_YOU).toStrictEqual(
      `You saved me {{ userId }}, thank you!`
    );
  });

  it(`should have a member "GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME).toStrictEqual(
      `God damn it! Next time don't break me!`
    );
  });

  it(`should have a member "GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME_YOU_NOOB"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.GOD_DAMN_IT_NEXT_TIME_DO_NOT_BREAK_ME_YOU_NOOB).toStrictEqual(
      `God damn it! Next time don't break me you noob!`
    );
  });

  it(`should have a member "THOSE_DEVELOPERS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.THOSE_DEVELOPERS).toStrictEqual(`Those developers...`);
  });

  it(`should have a member "THESE_DEVELOPERS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.THESE_DEVELOPERS).toStrictEqual(`These developers...`);
  });

  it(`should have a member "BUG_FIX_THERE_BUG_FIX_HERE_TSS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.BUG_FIX_THERE_BUG_FIX_HERE_TSS).toStrictEqual(
      `Bug fix there, bug fix here, tss.`
    );
  });

  it(`should have a member "BUG_FIX_THERE_BUG_FIX_HERE_YOU_SUCKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.BUG_FIX_THERE_BUG_FIX_HERE_YOU_SUCKS).toStrictEqual(
      `Bug fix there, bug fix here, you sucks!`
    );
  });

  it(`should have a member "THEY_CA_NOT_WORK_WITHOUT_BREAKING_ME_OR_WHAT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.THEY_CA_NOT_WORK_WITHOUT_BREAKING_ME_OR_WHAT).toStrictEqual(
      `They can't work without breaking me or what?`
    );
  });

  it(`should have a member "SORRY_I_WAS_A_MESS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.SORRY_I_WAS_A_MESS).toStrictEqual(`Sorry, I was a mess!`);
  });

  it(`should have a member "BOOM_GONE_I_AM_NO_LONGER_BROKEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.BOOM_GONE_I_AM_NO_LONGER_BROKEN).toStrictEqual(
      `Boom, gone, I'm no longer broken!`
    );
  });

  it(`should have a member "IT_IS_LIKE_AN_HANGOVER_FOR_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.IT_IS_LIKE_AN_HANGOVER_FOR_ME).toStrictEqual(
      `It's like an hangover for me.`
    );
  });

  it(`should have a member "I_AM_TOO_GOOD_TO_BE_BROKEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewBugFixesVersionResponseEnum.I_AM_TOO_GOOD_TO_BE_BROKEN).toStrictEqual(
      `I am too good to be broken.`
    );
  });
});
