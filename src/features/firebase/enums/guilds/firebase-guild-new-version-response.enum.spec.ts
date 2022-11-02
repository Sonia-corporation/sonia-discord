import { FirebaseGuildNewVersionResponseEnum } from './firebase-guild-new-version-response.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`FirebaseGuildNewVersionResponseEnum`, (): void => {
  it(`should have 53 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(FirebaseGuildNewVersionResponseEnum)).toBe(53);
  });

  it(`should have a member "A_QUEEN_HAS_TO_WORK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.A_QUEEN_HAS_TO_WORK).toBe(`A queen has to work.`);
  });

  it(`should have a member "ABOUT_TIME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.ABOUT_TIME).toBe(`About time!`);
  });

  it(`should have a member "ABOUT_TIME_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.ABOUT_TIME_USER_ID).toBe(`About time {{ userId }}!`);
  });

  it(`should have a member "BALL_SACK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.BALL_SACK).toBe(`Ball sack.`);
  });

  it(`should have a member "BEST_BIRTHDAY_EVER"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.BEST_BIRTHDAY_EVER).toBe(`Best birthday ever!`);
  });

  it(`should have a member "CHECK_THIS_NEW_ABILITY"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.CHECK_THIS_NEW_ABILITY).toBe(`Check this new ability!`);
  });

  it(`should have a member "CHECK_THIS_OUT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.CHECK_THIS_OUT).toBe(`Check this out!`);
  });

  it(`should have a member "COOL"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.COOL).toBe(`Cool!`);
  });

  it(`should have a member "CRAZY_SKILLS_HUH"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.CRAZY_SKILLS_HUH).toBe(`Crazy skills huh?!`);
  });

  it(`should have a member "DO_NOT_WORRY_I_AM_JUST_BETTER"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.DO_NOT_WORRY_I_AM_JUST_BETTER).toBe(`Do not worry I am just better.`);
  });

  it(`should have a member "EACH_DAY_I_GROW_STRONGER"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.EACH_DAY_I_GROW_STRONGER).toBe(`Each day I grow stronger.`);
  });

  it(`should have a member "EACH_DAY_YOU_GROW_STRONGER"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.EACH_DAY_YOU_GROW_STRONGER).toBe(`Each day you grow stronger.`);
  });

  it(`should have a member "ENJOY_MY_NEW_SUPER_POWERS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.ENJOY_MY_NEW_SUPER_POWERS).toBe(`Enjoy my new super powers!`);
  });

  it(`should have a member "ENJOY_THIS_NEW_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.ENJOY_THIS_NEW_FEATURE).toBe(`Enjoy this new feature!`);
  });

  it(`should have a member "GLAD_YOU_FIXES_THAT_BUG_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.GLAD_YOU_FIXES_THAT_BUG_USER_ID).toBe(
      `Glad you fixed that bug {{ userId }}!`
    );
  });

  it(`should have a member "GOTTA_LOVE_IT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.GOTTA_LOVE_IT).toBe(`Gotta love it!`);
  });

  it(`should have a member "HERE_IS_YOUR_RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.HERE_IS_YOUR_RELEASE_NOTES).toBe(`Here is your release notes!`);
  });

  it(`should have a member "I_AM_A_KING"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_A_KING).toBe(`I am a king.`);
  });

  it(`should have a member "I_AM_A_QUEEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_A_QUEEN).toBe(`I am a queen.`);
  });

  it(`should have a member "I_AM_CLOSER_TO_GOD"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_CLOSER_TO_GOD).toBe(`I am closer to god.`);
  });

  it(`should have a member "I_AM_CLOSER_TO_GOD_NOW"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_CLOSER_TO_GOD_NOW).toBe(`I am closer to god now.`);
  });

  it(`should have a member "I_AM_CLOSER_TO_GOD_RIGHT_NOW"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_CLOSER_TO_GOD_RIGHT_NOW).toBe(`I am closer to god right now.`);
  });

  it(`should have a member "I_AM_THE_BOSS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_THE_BOSS).toBe(`I am the boss.`);
  });

  it(`should have a member "I_AM_THRILLED"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_AM_THRILLED).toBe(`I am thrilled.`);
  });

  it(`should have a member "I_KNOW_WHAT_I_AM_DOING"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.I_KNOW_WHAT_I_AM_DOING).toBe(`I know what I'm doing.`);
  });

  it(`should have a member "LOVE_THAT_ONE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.LOVE_THAT_ONE).toBe(`Love that one!`);
  });

  it(`should have a member "MY_THRONE_IS_WAITING_FOR_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.MY_THRONE_IS_WAITING_FOR_ME).toBe(`My throne is waiting for me.`);
  });

  it(`should have a member "NO_SPAM_IF_USER_ID_COULD_STOP_WORKING"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.NO_SPAM_IF_USER_ID_COULD_STOP_WORKING).toBe(
      `No spam if {{ userId }} could stop working...`
    );
  });

  it(`should have a member "NO_SPAM_IF_USER_ID_COULD_STOP_WORKING_RIGHT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.NO_SPAM_IF_USER_ID_COULD_STOP_WORKING_RIGHT).toBe(
      `No spam if {{ userId }} could stop working, right?`
    );
  });

  it(`should have a member "NOTHING_CAN_STOP_ME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.NOTHING_CAN_STOP_ME).toBe(`Nothing can stop me!`);
  });

  it(`should have a member "OH_THATS_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.OH_THATS_AWESOME).toBe(`Oh! That's awesome!`);
  });

  it(`should have a member "PLEASE_USER_ID_STOP_IT_AM_EXHAUSTED_OF_SENDING_RELEASE_NOTES_MESSAGES"`, (): void => {
    expect.assertions(1);

    expect(
      FirebaseGuildNewVersionResponseEnum.PLEASE_USER_ID_STOP_IT_AM_EXHAUSTED_OF_SENDING_RELEASE_NOTES_MESSAGES
    ).toBe(`Please {{ userId }} stop it. I am exhausted of sending release notes messages...`);
  });

  it(`should have a member "SERIOUSLY_USER_ID_THIS_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.SERIOUSLY_USER_ID_THIS_FEATURE).toBe(
      `Seriously {{ userId }}? This feature!?`
    );
  });

  it(`should have a member "SLOW_DOWN_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.SLOW_DOWN_USER_ID).toBe(`Slow down {{ userId }}.`);
  });

  it(`should have a member "SONIA_IS_BRAND_NEW"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.SONIA_IS_BRAND_NEW).toBe(`Sonia is brand new!`);
  });

  it(`should have a member "STOP_WORKING_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.STOP_WORKING_USER_ID).toBe(`Stop working {{ userId }}!`);
  });

  it(`should have a member "THANK_YOU_USER_DI"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THANK_YOU_USER_DI).toBe(`Thank you {{ userId }}.`);
  });

  it(`should have a member "THANK_YOU_USER_ID_FOR_THIS_WONDERFUL_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THANK_YOU_USER_ID_FOR_THIS_WONDERFUL_FEATURE).toBe(
      `Thank you {{ userId }} for this wonderful feature!`
    );
  });

  it(`should have a member "THAT_IS_FREAKING_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THAT_IS_FREAKING_AWESOME).toBe(`That is freaking awesome!`);
  });

  it(`should have a member "THE_THRONE_IS_WAITING_FOR_HIS_QUEEN"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THE_THRONE_IS_WAITING_FOR_HIS_QUEEN).toBe(
      `The throne is waiting for his queen.`
    );
  });

  it(`should have a member "THIS_IS_MY_BIRTHDAY"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THIS_IS_MY_BIRTHDAY).toBe(`This is my birthday!`);
  });

  it(`should have a member "THIS_NEW_FEATURE_SUCKS"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THIS_NEW_FEATURE_SUCKS).toBe(`This new feature sucks.`);
  });

  it(`should have a member "THIS_SPAM_IS_NOT_MY_FAULT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.THIS_SPAM_IS_NOT_MY_FAULT).toBe(`This spam is not my fault!`);
  });

  it(`should have a member "USER_ID_SLOW_DOWN_FOR_GODS_SAKE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.USER_ID_SLOW_DOWN_FOR_GODS_SAKE).toBe(
      `{{ userId }}, slow down for god's sake!`
    );
  });

  it(`should have a member "USER_ID_YOU_SHOULD_REST_A_LITTLE_DONT_YOU_THINK"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.USER_ID_YOU_SHOULD_REST_A_LITTLE_DONT_YOU_THINK).toBe(
      `{{ userId }} you should rest a little don't you think?`
    );
  });

  it(`should have a member "WORST_BIRTHDAY_EVER"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.WORST_BIRTHDAY_EVER).toBe(`Worst birthday ever.`);
  });

  it(`should have a member "WOW_CHECK_THIS_OUT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.WOW_CHECK_THIS_OUT).toBe(`Wow! Check this out!`);
  });

  it(`should have a member "WOW_SLOW_DOWN_USER_ID"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.WOW_SLOW_DOWN_USER_ID).toBe(`Wow! Slow down {{ userId }}!`);
  });

  it(`should have a member "YEP_THATS_BRAND_NEW"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.YEP_THATS_BRAND_NEW).toBe(`Yep that's brand new!`);
  });

  it(`should have a member "YUP_THATS_TRUE"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.YUP_THATS_TRUE).toBe(`Yup! That's true!`);
  });

  it(`should have a member "YUP_THATS_TRUE_I_AM_BETTER"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.YUP_THATS_TRUE_I_AM_BETTER).toBe(`Yup! That's true I am better.`);
  });

  it(`should have a member "YUP_THATS_TRUE_I_AM_BETTER_AND_YOU_KNOW_IT"`, (): void => {
    expect.assertions(1);

    expect(FirebaseGuildNewVersionResponseEnum.YUP_THATS_TRUE_I_AM_BETTER_AND_YOU_KNOW_IT).toBe(
      `Yup! That's true I am better and you know it!`
    );
  });
});
