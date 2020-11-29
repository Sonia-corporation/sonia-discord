import { DiscordCommandFlagSuccessDescriptionEnum } from './discord-command-flag-success-description.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordCommandFlagSuccessDescriptionEnum`, (): void => {
  it(`should have a 6 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordCommandFlagSuccessDescriptionEnum)).toStrictEqual(6);
  });

  it(`should have a member "NOT_CONFIGURED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_ENABLED).toStrictEqual(
      `The noon feature was not configured yet and is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`
    );
  });

  it(`should have a member "NOT_CONFIGURED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessDescriptionEnum.NOT_CONFIGURED_AND_DISABLED).toStrictEqual(
      `The noon feature was not configured yet and is now disabled on this channel.`
    );
  });

  it(`should have a member "ENABLED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessDescriptionEnum.ENABLED_AND_ENABLED).toStrictEqual(
      `The noon feature was already enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`
    );
  });

  it(`should have a member "ENABLED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessDescriptionEnum.ENABLED_AND_DISABLED).toStrictEqual(
      `The noon feature is now disabled on this channel.`
    );
  });

  it(`should have a member "DISABLED_AND_ENABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessDescriptionEnum.DISABLED_AND_ENABLED).toStrictEqual(
      `The noon feature is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`
    );
  });

  it(`should have a member "DISABLED_AND_DISABLED"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagSuccessDescriptionEnum.DISABLED_AND_DISABLED).toStrictEqual(
      `The noon feature was already disabled on this channel.`
    );
  });
});
