import { DISCORD_SONIA_CONFIG } from "./discord-sonia-config";

describe(`DISCORD_SONIA_CONFIG`, (): void => {
  it(`should have a corporation image url`, (): void => {
    expect.assertions(1);

    expect(DISCORD_SONIA_CONFIG.corporationImageUrl).toStrictEqual(
      `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`
    );
  });

  it(`should have a corporation message embed author icon url`, (): void => {
    expect.assertions(1);

    expect(
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.iconURL
    ).toStrictEqual(`https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`);
  });

  it(`should have a corporation message embed author name`, (): void => {
    expect.assertions(1);

    expect(
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.name
    ).toStrictEqual(`Sonia`);
  });

  it(`should have a corporation message embed author url`, (): void => {
    expect.assertions(1);

    expect(
      DISCORD_SONIA_CONFIG.corporationMessageEmbedAuthor.url
    ).toStrictEqual(`https://github.com/Sonia-corporation?type=source`);
  });

  it(`should have an unknown id`, (): void => {
    expect.assertions(1);

    expect(DISCORD_SONIA_CONFIG.id).toStrictEqual(`unknown`);
  });

  it(`should have an unknown secret token`, (): void => {
    expect.assertions(1);

    expect(DISCORD_SONIA_CONFIG.secretToken).toStrictEqual(`unknown`);
  });
});
