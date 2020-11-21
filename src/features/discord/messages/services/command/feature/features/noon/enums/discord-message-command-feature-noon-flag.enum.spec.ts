import { DiscordMessageCommandFeatureNoonFlagEnum } from './discord-message-command-feature-noon-flag.enum';

describe(`DiscordMessageCommandFeatureNoonFlagEnum`, (): void => {
  it(`should have a member "D"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.D).toStrictEqual(`d`);
  });

  it(`should have a member "DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.DISABLED).toStrictEqual(`disabled`);
  });

  it(`should have a member "E"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.E).toStrictEqual(`e`);
  });

  it(`should have a member "ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.ENABLED).toStrictEqual(`enabled`);
  });

  it(`should have a member "H"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.H).toStrictEqual(`h`);
  });

  it(`should have a member "HELP"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.HELP).toStrictEqual(`help`);
  });

  it(`should have a member "HU"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.HU).toStrictEqual(`hu`);
  });

  it(`should have a member "HUMANIZE"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.HUMANIZE).toStrictEqual(`humanize`);
  });

  it(`should have a member "S"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.S).toStrictEqual(`s`);
  });

  it(`should have a member "STATUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.STATUS).toStrictEqual(`status`);
  });
});
