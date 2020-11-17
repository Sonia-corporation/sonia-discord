import { DiscordCommandFlagSuccessTitleEnum } from './discord-command-flag-success-title.enum';

describe(`DiscordCommandFlagSuccessTitleEnum`, (): void => {
  it(`should have a member "NOON_FEATURE_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_DISABLED).toStrictEqual(`Noon feature disabled`);
  });

  it(`should have a member "NOON_FEATURE_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_ENABLED).toStrictEqual(`Noon feature enabled`);
  });
});
