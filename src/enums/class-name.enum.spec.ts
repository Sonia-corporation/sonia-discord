import { ClassNameEnum } from "./class-name.enum";

describe(`ClassNameEnum`, (): void => {
  it(`should have a member "DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(
      ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED
    ).toStrictEqual(`DiscordMessageCommandFeatureNoonEnabled`);
  });
});
