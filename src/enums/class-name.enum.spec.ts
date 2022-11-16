import { ClassNameEnum } from './class-name.enum';
import { getEnumLength } from '../functions/checks/get-enum-length';

describe(`ClassNameEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(ClassNameEnum)).toBe(10);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_DISABLED).toBe(
      `DiscordMessageCommandFeatureNoonDisabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED).toBe(`DiscordMessageCommandFeatureNoonEnabled`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HELP"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HELP).toBe(`DiscordMessageCommandFeatureNoonHelp`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE).toBe(
      `DiscordMessageCommandFeatureNoonHumanize`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_STATUS"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_STATUS).toBe(`DiscordMessageCommandFeatureNoonStatus`);
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_DISABLED).toBe(
      `DiscordMessageCommandFeatureReleaseNotesDisabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED).toBe(
      `DiscordMessageCommandFeatureReleaseNotesEnabled`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HELP"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HELP).toBe(
      `DiscordMessageCommandFeatureReleaseNotesHelp`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE).toBe(
      `DiscordMessageCommandFeatureReleaseNotesHumanize`
    );
  });

  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_STATUS"`, (): void => {
    expect.assertions(1);

    expect(ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_STATUS).toBe(
      `DiscordMessageCommandFeatureReleaseNotesStatus`
    );
  });
});
