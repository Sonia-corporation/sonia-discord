import { DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum } from './discord-message-command-release-notes-flag-success-title.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum)).toBe(2);
  });

  it(`should have a member "RELEASE_NOTES_FEATURE_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_DISABLED).toBe(
      `Release notes feature disabled`
    );
  });

  it(`should have a member "RELEASE_NOTES_FEATURE_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessTitleEnum.RELEASE_NOTES_FEATURE_ENABLED).toBe(
      `Release notes feature enabled`
    );
  });
});
