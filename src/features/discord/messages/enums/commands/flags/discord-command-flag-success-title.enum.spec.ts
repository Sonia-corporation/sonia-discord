import { DiscordCommandFlagSuccessTitleEnum } from './discord-command-flag-success-title.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordCommandFlagSuccessTitleEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordCommandFlagSuccessTitleEnum)).toStrictEqual(2);
  });

  it(`should have a member "NOON_FEATURE_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_DISABLED).toStrictEqual(`Noon feature disabled`);
  });

  it(`should have a member "NOON_FEATURE_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_ENABLED).toStrictEqual(`Noon feature enabled`);
  });
});
