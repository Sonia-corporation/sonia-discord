import { DiscordSoniaConfigValueNameEnum } from './discord-sonia-config-value-name.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordSoniaConfigValueNameEnum`, (): void => {
  it(`should have 7 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordSoniaConfigValueNameEnum)).toBe(7);
  });

  it(`should have a member "CORPORATION_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.CORPORATION_IMAGE_URL).toBe(`corporation image url`);
  });

  it(`should have a member "CORPORATION_MESSAGE_EMBED_AUTHOR_ICON_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_ICON_URL).toBe(
      `corporation message embed author icon url`
    );
  });

  it(`should have a member "CORPORATION_MESSAGE_EMBED_AUTHOR_NAME"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_NAME).toBe(
      `corporation message embed author name`
    );
  });

  it(`should have a member "CORPORATION_MESSAGE_EMBED_AUTHOR_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_URL).toBe(
      `corporation message embed author url`
    );
  });

  it(`should have a member "DEV_GUILD_ID_WHITELIST"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.DEV_GUILD_ID_WHITELIST).toBe(`dev guild id whitelist`);
  });

  it(`should have a member "ID"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.ID).toBe(`id`);
  });

  it(`should have a member "SECRET_TOKEN"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.SECRET_TOKEN).toBe(`secret token`);
  });
});
