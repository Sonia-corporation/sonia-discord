import { ClassNameEnum } from './class-name.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`ClassNameEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ClassNameEnum)).toStrictEqual(10);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_DISABLED).toStrictEqual(
      `DiscordMessageCommandFeatureNoonDisabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED).toStrictEqual(
      `DiscordMessageCommandFeatureNoonEnabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HELP"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HELP).toStrictEqual(
      `DiscordMessageCommandFeatureNoonHelp`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE).toStrictEqual(
      `DiscordMessageCommandFeatureNoonHumanize`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_STATUS"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_STATUS).toStrictEqual(
      `DiscordMessageCommandFeatureNoonStatus`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_DISABLED).toStrictEqual(
      `DiscordMessageCommandFeatureReleaseNotesDisabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED).toStrictEqual(
      `DiscordMessageCommandFeatureReleaseNotesEnabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HELP"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HELP).toStrictEqual(
      `DiscordMessageCommandFeatureReleaseNotesHelp`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE).toStrictEqual(
      `DiscordMessageCommandFeatureReleaseNotesHumanize`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_STATUS"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_STATUS).toStrictEqual(
      `DiscordMessageCommandFeatureReleaseNotesStatus`
    );
  });
});
