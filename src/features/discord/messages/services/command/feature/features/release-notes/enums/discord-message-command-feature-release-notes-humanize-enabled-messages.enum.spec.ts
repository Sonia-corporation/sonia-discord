import { DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum } from './discord-message-command-feature-release-notes-humanize-enabled-messages.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum)).toBe(10);
  });

  it(`should have a member "I_LOVE_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_LOVE_YOU).toBe(`I love you!`);
  });

  it(`should have a member "I_WILL_SPAM_THE_HELL_OUT_OF_YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_WILL_SPAM_THE_HELL_OUT_OF_YOU).toBe(
      `I will spam the hell out of you.`
    );
  });

  it(`should have a member "RELEASE_NOTES_IS_LIFE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.RELEASE_NOTES_IS_LIFE).toBe(
      `Release notes is life.`
    );
  });

  it(`should have a member "THIS_FEATURE_IS_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.THIS_FEATURE_IS_AWESOME).toBe(
      `This feature is awesome.`
    );
  });

  it(`should have a member "WE_ARE_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.WE_ARE_AWESOME).toBe(`We are awesome.`);
  });

  it(`should have a member "YEAH_YOU_ENABLED_IT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YEAH_YOU_ENABLED_IT).toBe(
      `Yeah! You enabled it!`
    );
  });

  it(`should have a member "YOU_ARE_AWESOME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_ARE_AWESOME).toBe(
      `You are awesome.`
    );
  });

  it(`should have a member "YOU_CAN_COUNT_ON_ME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_CAN_COUNT_ON_ME).toBe(
      `You can count on me!`
    );
  });

  it(`should have a member "YOU_GOTTA_LOVE_THIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_GOTTA_LOVE_THIS).toBe(
      `You gotta love this!`
    );
  });

  it(`should have a member "YOU_WILL_LEARN_TO_LOVE_THE_RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.YOU_WILL_LEARN_TO_LOVE_THE_RELEASE_NOTES
    ).toBe(`You will learn to love the release notes.`);
  });
});
