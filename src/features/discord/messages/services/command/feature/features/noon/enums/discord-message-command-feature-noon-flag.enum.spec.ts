import { DiscordMessageCommandFeatureNoonFlagEnum } from "./discord-message-command-feature-noon-flag.enum";

describe(`DiscordMessageCommandFeatureNoonFlagEnum`, (): void => {
  it(`should have a member "D"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.D).toStrictEqual(`d`);
  });

  it(`should have a member "DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.DISABLED).toStrictEqual(
      `disabled`
    );
  });

  it(`should have a member "E"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.E).toStrictEqual(`e`);
  });

  it(`should have a member "ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNoonFlagEnum.ENABLED).toStrictEqual(
      `enabled`
    );
  });
});
