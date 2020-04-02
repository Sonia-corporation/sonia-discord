import { DiscordSoniaConfigValueNameEnum } from "./discord-sonia-config-value-name.enum";

describe(`DiscordSoniaConfigValueNameEnum`, (): void => {
  it(`should have a member "CORPORATION_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.CORPORATION_IMAGE_URL).toStrictEqual(
      `corporation image url`
    );
  });

  it(`should have a member "CORPORATION_MESSAGE_EMBED_AUTHOR_ICON_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_ICON_URL
    ).toStrictEqual(`corporation message embed author icon url`);
  });

  it(`should have a member "CORPORATION_MESSAGE_EMBED_AUTHOR_NAME"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_NAME
    ).toStrictEqual(`corporation message embed author name`);
  });

  it(`should have a member "CORPORATION_MESSAGE_EMBED_AUTHOR_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordSoniaConfigValueNameEnum.CORPORATION_MESSAGE_EMBED_AUTHOR_URL
    ).toStrictEqual(`corporation message embed author url`);
  });

  it(`should have a member "ID"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.ID).toStrictEqual(`id`);
  });

  it(`should have a member "SECRET_TOKEN"`, (): void => {
    expect.assertions(1);

    expect(DiscordSoniaConfigValueNameEnum.SECRET_TOKEN).toStrictEqual(
      `secret token`
    );
  });
});
