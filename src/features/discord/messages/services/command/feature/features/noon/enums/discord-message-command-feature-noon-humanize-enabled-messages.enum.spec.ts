import { DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum } from './discord-message-command-feature-noon-humanize-enabled-messages.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum)).toBe(10);
  });

  it(`should have a member "I_LOVE_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.I_LOVE_YOU).toStrictEqual(`I love you!`);
  });

  it(`should have a member "I_WILL_SPAM_THE_HELL_OUT_OF_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.I_WILL_SPAM_THE_HELL_OUT_OF_YOU).toStrictEqual(
      `I will spam the hell out of you.`
    );
  });

  it(`should have a member "NOON_IS_LIFE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.NOON_IS_LIFE).toStrictEqual(`Noon is life.`);
  });

  it(`should have a member "THIS_FEATURE_IS_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.THIS_FEATURE_IS_AWESOME).toStrictEqual(
      `This feature is awesome.`
    );
  });

  it(`should have a member "WE_ARE_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.WE_ARE_AWESOME).toStrictEqual(`We are awesome.`);
  });

  it(`should have a member "YEAH_YOU_ENABLED_IT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.YEAH_YOU_ENABLED_IT).toStrictEqual(
      `Yeah! You enabled it!`
    );
  });

  it(`should have a member "YOU_ARE_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.YOU_ARE_AWESOME).toStrictEqual(
      `You are awesome.`
    );
  });

  it(`should have a member "YOU_CAN_COUNT_ON_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.YOU_CAN_COUNT_ON_ME).toStrictEqual(
      `You can count on me!`
    );
  });

  it(`should have a member "YOU_GOTTA_LOVE_THIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.YOU_GOTTA_LOVE_THIS).toStrictEqual(
      `You gotta love this!`
    );
  });

  it(`should have a member "YOU_WILL_LEARN_TO_LOVE_NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.YOU_WILL_LEARN_TO_LOVE_NOON).toStrictEqual(
      `You will learn to love noon.`
    );
  });
});
