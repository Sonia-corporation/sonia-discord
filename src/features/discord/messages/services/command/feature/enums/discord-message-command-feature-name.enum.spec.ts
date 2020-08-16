import { DiscordMessageCommandFeatureNameEnum } from "./discord-message-command-feature-name.enum";

describe(`DiscordMessageCommandFeatureNameEnum`, (): void => {
  it(`should have a member "NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.NOON).toStrictEqual(`noon`);
  });

  it(`should have a member "N"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.N).toStrictEqual(`n`);
  });
});
