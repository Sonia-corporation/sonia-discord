import { DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum } from './discord-message-command-release-notes-flag-success-description.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum`, (): void => {
  it(`should have a 6 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum)).toStrictEqual(6);
  });

  it(`should have a member "NOT_CONFIGURED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_ENABLED).toStrictEqual(
      `The release notes feature was not configured yet and is now enabled on this channel. A message will be sent each time a new release is deployed.`
    );
  });

  it(`should have a member "NOT_CONFIGURED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_DISABLED).toStrictEqual(
      `The release notes feature was not configured yet and is now disabled on this channel.`
    );
  });

  it(`should have a member "ENABLED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.ENABLED_AND_ENABLED).toStrictEqual(
      `The release notes feature was already enabled on this channel. A message will be sent each time a new release is deployed.`
    );
  });

  it(`should have a member "ENABLED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.ENABLED_AND_DISABLED).toStrictEqual(
      `The release notes feature is now disabled on this channel.`
    );
  });

  it(`should have a member "DISABLED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.DISABLED_AND_ENABLED).toStrictEqual(
      `The release notes feature is now enabled on this channel. A message will be sent each time a new release is deployed.`
    );
  });

  it(`should have a member "DISABLED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandReleaseNotesFlagSuccessDescriptionEnum.DISABLED_AND_DISABLED).toStrictEqual(
      `The release notes feature was already disabled on this channel.`
    );
  });
});
