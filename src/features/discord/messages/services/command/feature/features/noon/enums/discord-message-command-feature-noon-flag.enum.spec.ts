import { DiscordMessageCommandFeatureNoonFlagEnum } from './discord-message-command-feature-noon-flag.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNoonFlagEnum`, (): void => {
  it(`should have 10 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNoonFlagEnum)).toBe(10);
  });

  it(`should have a member "D"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.D).toBe(`d`);
  });

  it(`should have a member "DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.DISABLED).toBe(`disabled`);
  });

  it(`should have a member "E"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.E).toBe(`e`);
  });

  it(`should have a member "ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.ENABLED).toBe(`enabled`);
  });

  it(`should have a member "H"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.H).toBe(`h`);
  });

  it(`should have a member "HELP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.HELP).toBe(`help`);
  });

  it(`should have a member "HU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.HU).toBe(`hu`);
  });

  it(`should have a member "HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.HUMANIZE).toBe(`humanize`);
  });

  it(`should have a member "S"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.S).toBe(`s`);
  });

  it(`should have a member "STATUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.STATUS).toBe(`status`);
  });
});
