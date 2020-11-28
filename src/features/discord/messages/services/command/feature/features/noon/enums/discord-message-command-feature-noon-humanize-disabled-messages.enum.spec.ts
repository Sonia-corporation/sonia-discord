import { DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum } from './discord-message-command-feature-noon-humanize-disabled-messages.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum`, (): void => {
  it(`should have a 25 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum)).toStrictEqual(25);
  });

  it(`should have a member "CAN_I_COUNT_ON_YOU_TO_ENABLE_NOON"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.CAN_I_COUNT_ON_YOU_TO_ENABLE_NOON
    ).toStrictEqual(`Can I count on you to enable noon?`);
  });

  it(`should have a member "CAN_I_COUNT_ON_YOU_TO_ENABLE_THIS_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.CAN_I_COUNT_ON_YOU_TO_ENABLE_THIS_FEATURE
    ).toStrictEqual(`Can I count on you to enable this feature??`);
  });

  it(`should have a member "COME_ON_JUST_DO_IT_ALLOW_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.COME_ON_JUST_DO_IT_ALLOW_ME).toStrictEqual(
      `Come on just do it! Allow me!`
    );
  });

  it(`should have a member "COME_ON_YOU_COULD_AT_LEAST_ASK_ME_TO_TELL_YOU_WHEN_IT_IS_NOON"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.COME_ON_YOU_COULD_AT_LEAST_ASK_ME_TO_TELL_YOU_WHEN_IT_IS_NOON
    ).toStrictEqual(`Come on, you could at least ask me to tell you when it's noon!`);
  });

  it(`should have a member "DO_NOT_WORRY_I_WILL_NOT_SEND_A_NOON_MESSAGE_HERE"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.DO_NOT_WORRY_I_WILL_NOT_SEND_A_NOON_MESSAGE_HERE
    ).toStrictEqual(`Don't worry I will not send a noon message here.`);
  });

  it(`should have a member "DUH_IT_IS_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.DUH_IT_IS_DISABLED).toStrictEqual(
      `Duh? It's disabled...`
    );
  });

  it(`should have a member "DUH_IT_IS_NOT_EVEN_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.DUH_IT_IS_NOT_EVEN_ENABLED).toStrictEqual(
      `Duh? It's not even enabled!`
    );
  });

  it(`should have a member "I_AM_NOT_PLANING_ON_SPAMMING_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_AM_NOT_PLANING_ON_SPAMMING_YOU).toStrictEqual(
      `I am not planing on spamming you.`
    );
  });

  it(`should have a member "I_JUST_LOVE_WHEN_IT_IS_NOON_ALLOW_ME"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_JUST_LOVE_WHEN_IT_IS_NOON_ALLOW_ME
    ).toStrictEqual(`I just love when it's noon. Allow me!`);
  });

  it(`should have a member "I_SWEAR_I_AM_NOT_PLANING_DO_SPAM_THIS_CHANNEL_AT_ALL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_SWEAR_I_AM_NOT_PLANING_DO_SPAM_THIS_CHANNEL_AT_ALL
    ).toStrictEqual(`I swear I am not planing do spam this channel at all.`);
  });

  it(`should have a member "I_WANT_TO_TELL_YOU_WHEN_IT_IS_NOON_BUT_YOU_NEED_TO_ALLOW_ME_FIRST"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WANT_TO_TELL_YOU_WHEN_IT_IS_NOON_BUT_YOU_NEED_TO_ALLOW_ME_FIRST
    ).toStrictEqual(`I want to tell you when it's noon but you need to allow me first!`);
  });

  it(`should have a member "I_WILL_LEAVE_YOU_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LEAVE_YOU_ALONE).toStrictEqual(
      `I will leave you alone.`
    );
  });

  it(`should have a member "I_WILL_LEAVE_YOU_ALONE_DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LEAVE_YOU_ALONE_DO_NOT_WORRY
    ).toStrictEqual(`I will leave you alone, don't worry.`);
  });

  it(`should have a member "I_WILL_LET_YOU_LIVE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LET_YOU_LIVE).toStrictEqual(
      `I will let you live.`
    );
  });

  it(`should have a member "I_WILL_LET_YOU_LIVE_DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LET_YOU_LIVE_DO_NOT_WORRY).toStrictEqual(
      `I will let you live, don't worry.`
    );
  });

  it(`should have a member "I_WILL_NOT_BOTHER_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU).toStrictEqual(
      `I will not bother you.`
    );
  });

  it(`should have a member "I_WILL_NOT_BOTHER_YOU_DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU_DO_NOT_WORRY
    ).toStrictEqual(`I will not bother you, don't worry.`);
  });

  it(`should have a member "IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_NOON"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_NOON
    ).toStrictEqual(`Is it too much to ask to enable noon?`);
  });

  it(`should have a member "IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_THIS_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_THIS_FEATURE
    ).toStrictEqual(`Is it too much to ask to enable this feature?`);
  });

  it(`should have a member "NOON_IS_LIFE_NOON_IS_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.NOON_IS_LIFE_NOON_IS_DISABLED).toStrictEqual(
      `Noon is life, noon is disabled...`
    );
  });

  it(`should have a member "NOON_IS_LIFE_NOON_IS_NOT_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.NOON_IS_LIFE_NOON_IS_NOT_ENABLED).toStrictEqual(
      `Noon is life, noon is not enabled...`
    );
  });

  it(`should have a member "PLEASE_LET_ME_SPAM_YOU_WHEN_IT_IS_NOON"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.PLEASE_LET_ME_SPAM_YOU_WHEN_IT_IS_NOON
    ).toStrictEqual(`Please let me spam you when it's noon!`);
  });

  it(`should have a member "PLEASE_PLEASE_PLEASE_ALLOW_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.PLEASE_PLEASE_PLEASE_ALLOW_ME).toStrictEqual(
      `Please, please, please! Allow me!`
    );
  });

  it(`should have a member "ROSES_ARE_RED_VIOLETS_ARE_BLUE_NOON_IS_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.ROSES_ARE_RED_VIOLETS_ARE_BLUE_NOON_IS_DISABLED
    ).toStrictEqual(`Roses are red. Violets are blue. Noon is disabled.`);
  });

  it(`should have a member "SHOULD_NOT_I_DESERVE_AT_LEAST_THIS_ENABLE_IT"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.SHOULD_NOT_I_DESERVE_AT_LEAST_THIS_ENABLE_IT
    ).toStrictEqual(`Shouldn't I deserve at least this? Enable it!`);
  });
});
