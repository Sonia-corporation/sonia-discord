import { DiscordMessageCommandNoonFlagSuccessTitleEnum } from './discord-message-command-noon-flag-success-title.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordCommandFlagSuccessTitleEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandNoonFlagSuccessTitleEnum)).toBe(2);
  });

  it(`should have a member "NOON_FEATURE_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_DISABLED).toBe(`Noon feature disabled`);
  });

  it(`should have a member "NOON_FEATURE_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_ENABLED).toBe(`Noon feature enabled`);
  });
});
