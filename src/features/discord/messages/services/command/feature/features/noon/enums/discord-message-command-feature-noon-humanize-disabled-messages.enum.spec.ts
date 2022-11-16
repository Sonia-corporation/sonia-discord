import { DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum } from './discord-message-command-feature-noon-humanize-disabled-messages.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum`, (): void => {
  it(`should have 25 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum)).toBe(25);
  });

  it(`should have a member "CAN_I_COUNT_ON_YOU_TO_ENABLE_NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.CAN_I_COUNT_ON_YOU_TO_ENABLE_NOON).toBe(
      `Can I count on you to enable noon?`
    );
  });

  it(`should have a member "CAN_I_COUNT_ON_YOU_TO_ENABLE_THIS_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.CAN_I_COUNT_ON_YOU_TO_ENABLE_THIS_FEATURE).toBe(
      `Can I count on you to enable this feature??`
    );
  });

  it(`should have a member "COME_ON_JUST_DO_IT_ALLOW_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.COME_ON_JUST_DO_IT_ALLOW_ME).toBe(
      `Come on just do it! Allow me!`
    );
  });

  it(`should have a member "COME_ON_YOU_COULD_AT_LEAST_ASK_ME_TO_TELL_YOU_WHEN_IT_IS_NOON"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.COME_ON_YOU_COULD_AT_LEAST_ASK_ME_TO_TELL_YOU_WHEN_IT_IS_NOON
    ).toBe(`Come on, you could at least ask me to tell you when it's noon!`);
  });

  it(`should have a member "DO_NOT_WORRY_I_WILL_NOT_SEND_A_NOON_MESSAGE_HERE"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.DO_NOT_WORRY_I_WILL_NOT_SEND_A_NOON_MESSAGE_HERE
    ).toBe(`Don't worry I will not send a noon message here.`);
  });

  it(`should have a member "DUH_IT_IS_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.DUH_IT_IS_DISABLED).toBe(
      `Duh? It's disabled...`
    );
  });

  it(`should have a member "DUH_IT_IS_NOT_EVEN_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.DUH_IT_IS_NOT_EVEN_ENABLED).toBe(
      `Duh? It's not even enabled!`
    );
  });

  it(`should have a member "I_AM_NOT_PLANING_ON_SPAMMING_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_AM_NOT_PLANING_ON_SPAMMING_YOU).toBe(
      `I am not planing on spamming you.`
    );
  });

  it(`should have a member "I_JUST_LOVE_WHEN_IT_IS_NOON_ALLOW_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_JUST_LOVE_WHEN_IT_IS_NOON_ALLOW_ME).toBe(
      `I just love when it's noon. Allow me!`
    );
  });

  it(`should have a member "I_SWEAR_I_AM_NOT_PLANING_DO_SPAM_THIS_CHANNEL_AT_ALL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_SWEAR_I_AM_NOT_PLANING_DO_SPAM_THIS_CHANNEL_AT_ALL
    ).toBe(`I swear I am not planing do spam this channel at all.`);
  });

  it(`should have a member "I_WANT_TO_TELL_YOU_WHEN_IT_IS_NOON_BUT_YOU_NEED_TO_ALLOW_ME_FIRST"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WANT_TO_TELL_YOU_WHEN_IT_IS_NOON_BUT_YOU_NEED_TO_ALLOW_ME_FIRST
    ).toBe(`I want to tell you when it's noon but you need to allow me first!`);
  });

  it(`should have a member "I_WILL_LEAVE_YOU_ALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LEAVE_YOU_ALONE).toBe(
      `I will leave you alone.`
    );
  });

  it(`should have a member "I_WILL_LEAVE_YOU_ALONE_DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LEAVE_YOU_ALONE_DO_NOT_WORRY).toBe(
      `I will leave you alone, don't worry.`
    );
  });

  it(`should have a member "I_WILL_LET_YOU_LIVE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LET_YOU_LIVE).toBe(
      `I will let you live.`
    );
  });

  it(`should have a member "I_WILL_LET_YOU_LIVE_DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_LET_YOU_LIVE_DO_NOT_WORRY).toBe(
      `I will let you live, don't worry.`
    );
  });

  it(`should have a member "I_WILL_NOT_BOTHER_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU).toBe(
      `I will not bother you.`
    );
  });

  it(`should have a member "I_WILL_NOT_BOTHER_YOU_DO_NOT_WORRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU_DO_NOT_WORRY).toBe(
      `I will not bother you, don't worry.`
    );
  });

  it(`should have a member "IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_NOON).toBe(
      `Is it too much to ask to enable noon?`
    );
  });

  it(`should have a member "IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_THIS_FEATURE"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.IS_IT_TOO_MUCH_TO_ASK_TO_ENABLE_THIS_FEATURE
    ).toBe(`Is it too much to ask to enable this feature?`);
  });

  it(`should have a member "NOON_IS_LIFE_NOON_IS_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.NOON_IS_LIFE_NOON_IS_DISABLED).toBe(
      `Noon is life, noon is disabled...`
    );
  });

  it(`should have a member "NOON_IS_LIFE_NOON_IS_NOT_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.NOON_IS_LIFE_NOON_IS_NOT_ENABLED).toBe(
      `Noon is life, noon is not enabled...`
    );
  });

  it(`should have a member "PLEASE_LET_ME_SPAM_YOU_WHEN_IT_IS_NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.PLEASE_LET_ME_SPAM_YOU_WHEN_IT_IS_NOON).toBe(
      `Please let me spam you when it's noon!`
    );
  });

  it(`should have a member "PLEASE_PLEASE_PLEASE_ALLOW_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.PLEASE_PLEASE_PLEASE_ALLOW_ME).toBe(
      `Please, please, please! Allow me!`
    );
  });

  it(`should have a member "ROSES_ARE_RED_VIOLETS_ARE_BLUE_NOON_IS_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.ROSES_ARE_RED_VIOLETS_ARE_BLUE_NOON_IS_DISABLED
    ).toBe(`Roses are red. Violets are blue. Noon is disabled.`);
  });

  it(`should have a member "SHOULD_NOT_I_DESERVE_AT_LEAST_THIS_ENABLE_IT"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.SHOULD_NOT_I_DESERVE_AT_LEAST_THIS_ENABLE_IT
    ).toBe(`Shouldn't I deserve at least this? Enable it!`);
  });
});
