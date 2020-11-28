import { DiscordGuildConfigValueNameEnum } from './discord-guild-config-value-name.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordGuildConfigValueNameEnum`, (): void => {
  it(`should have a 5 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordGuildConfigValueNameEnum)).toStrictEqual(5);
  });

  it(`should have a member "SHOULD_SEND_COOKIES_ON_CREATE"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildConfigValueNameEnum.SHOULD_SEND_COOKIES_ON_CREATE).toStrictEqual(`send cookies on create state`);
  });

  it(`should have a member "SHOULD_SEND_NOON_MESSAGE"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildConfigValueNameEnum.SHOULD_SEND_NOON_MESSAGE).toStrictEqual(`send noon message state`);
  });

  it(`should have a member "SHOULD_WELCOME_NEW_MEMBERS"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildConfigValueNameEnum.SHOULD_WELCOME_NEW_MEMBERS).toStrictEqual(`welcome new members state`);
  });

  it(`should have a member "SONIA_GUILD_ID"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildConfigValueNameEnum.SONIA_GUILD_ID).toStrictEqual(`Sonia guild id`);
  });

  it(`should have a member "SONIA_PERMANENT_GUILD_INVITE_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildConfigValueNameEnum.SONIA_PERMANENT_GUILD_INVITE_URL).toStrictEqual(
      `Sonia permanent guild invite url`
    );
  });
});
