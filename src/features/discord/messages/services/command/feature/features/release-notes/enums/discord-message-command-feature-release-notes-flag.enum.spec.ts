import { DiscordMessageCommandFeatureReleaseNotesFlagEnum } from './discord-message-command-feature-release-notes-flag.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureReleaseNotesFlagEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureReleaseNotesFlagEnum)).toBe(10);
  });

  it(`should have a member "D"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.D).toBe(`d`);
  });

  it(`should have a member "DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.DISABLED).toBe(`disabled`);
  });

  it(`should have a member "E"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.E).toBe(`e`);
  });

  it(`should have a member "ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.ENABLED).toBe(`enabled`);
  });

  it(`should have a member "H"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.H).toBe(`h`);
  });

  it(`should have a member "HELP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.HELP).toBe(`help`);
  });

  it(`should have a member "HU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.HU).toBe(`hu`);
  });

  it(`should have a member "HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.HUMANIZE).toBe(`humanize`);
  });

  it(`should have a member "S"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.S).toBe(`s`);
  });

  it(`should have a member "STATUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureReleaseNotesFlagEnum.STATUS).toBe(`status`);
  });
});
