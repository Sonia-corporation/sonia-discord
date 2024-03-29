import { DiscordMessageCommandNoonFlagSuccessDescriptionEnum } from './discord-message-command-noon-flag-success-description.enum';
import { getEnumLength } from '../../../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandNoonFlagSuccessDescriptionEnum`, (): void => {
  it(`should have 6 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandNoonFlagSuccessDescriptionEnum)).toBe(6);
  });

  it(`should have a member "NOT_CONFIGURED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_ENABLED).toBe(
      `The noon feature was not configured yet and is now enabled on this {{ channelType }}. A message will be sent each day at noon (12 A.M) on Paris timezone.`
    );
  });

  it(`should have a member "NOT_CONFIGURED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_DISABLED).toBe(
      `The noon feature was not configured yet and is now disabled on this {{ channelType }}.`
    );
  });

  it(`should have a member "ENABLED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.ENABLED_AND_ENABLED).toBe(
      `The noon feature was already enabled on this {{ channelType }}. A message will be sent each day at noon (12 A.M) on Paris timezone.`
    );
  });

  it(`should have a member "ENABLED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.ENABLED_AND_DISABLED).toBe(
      `The noon feature is now disabled on this {{ channelType }}.`
    );
  });

  it(`should have a member "DISABLED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.DISABLED_AND_ENABLED).toBe(
      `The noon feature is now enabled on this {{ channelType }}. A message will be sent each day at noon (12 A.M) on Paris timezone.`
    );
  });

  it(`should have a member "DISABLED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandNoonFlagSuccessDescriptionEnum.DISABLED_AND_DISABLED).toBe(
      `The noon feature was already disabled on this {{ channelType }}.`
    );
  });
});
