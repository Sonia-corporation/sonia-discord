import { DiscordMessageCommandFeatureNoonFlagEnum } from "./discord-message-command-feature-noon-flag.enum";

describe(`DiscordMessageCommandFeatureNoonFlagEnum`, (): void => {
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
