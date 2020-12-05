import { DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum } from './discord-message-command-feature-release-notes-humanize-enabled-messages.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum`, (): void => {
  it(`should have a 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum)).toStrictEqual(10);
  });

  it(`should have a member "I_LOVE_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_LOVE_YOU).toStrictEqual(`I love you!`);
  });

  it(`should have a member "I_WILL_SPAM_THE_HELL_OUT_OF_YOU"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_WILL_SPAM_THE_HELL_OUT_OF_YOU
    ).toStrictEqual(`I will spam the hell out of you.`);
  });

  it(`should have a member "RELEASE_NOTES_IS_LIFE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.RELEASE_NOTES_IS_LIFE).toStrictEqual(
      `Release notes is life.`
    );
  });

  it(`should have a member "THIS_FEATURE_IS_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.THIS_FEATURE_IS_AWESOME).toStrictEqual(
      `This feature is awesome.`
    );
  });

  it(`should have a member "WE_ARE_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.WE_ARE_AWESOME).toStrictEqual(
      `We are awesome.`
    );
  });

  it(`should have a member "YEAH_YOU_ENABLED_IT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YEAH_YOU_ENABLED_IT).toStrictEqual(
      `Yeah! You enabled it!`
    );
  });

  it(`should have a member "YOU_ARE_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_ARE_AWESOME).toStrictEqual(
      `You are awesome.`
    );
  });

  it(`should have a member "YOU_CAN_COUNT_ON_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_CAN_COUNT_ON_ME).toStrictEqual(
      `You can count on me!`
    );
  });

  it(`should have a member "YOU_GOTTA_LOVE_THIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_GOTTA_LOVE_THIS).toStrictEqual(
      `You gotta love this!`
    );
  });

  it(`should have a member "YOU_WILL_LEARN_TO_LOVE_THE_RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_WILL_LEARN_TO_LOVE_THE_RELEASE_NOTES
    ).toStrictEqual(`You will learn to love the release notes.`);
  });
});
