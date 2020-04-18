import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";

jest.mock(`../../../../config/services/config.service`);

describe(`DiscordSoniaConfigCoreService`, (): void => {
  let service: DiscordSoniaConfigCoreService;

  beforeEach((): void => {
    service = DiscordSoniaConfigCoreService.getInstance();
  });

  it(`should have a corporation image url`, (): void => {
    expect.assertions(1);

    expect(service.corporationImageUrl).toStrictEqual(
      `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`
    );
  });

  it(`should have a corporation message embed author icon url`, (): void => {
    expect.assertions(1);

    expect(service.corporationMessageEmbedAuthor.iconURL).toStrictEqual(
      `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`
    );
  });

  it(`should have a corporation message embed author name`, (): void => {
    expect.assertions(1);

    expect(service.corporationMessageEmbedAuthor.name).toStrictEqual(`Sonia`);
  });

  it(`should have a corporation message embed author url`, (): void => {
    expect.assertions(1);

    expect(service.corporationMessageEmbedAuthor.url).toStrictEqual(
      `https://github.com/Sonia-corporation?type=source`
    );
  });

  it(`should have an unknown id`, (): void => {
    expect.assertions(1);

    expect(service.id).toStrictEqual(`unknown`);
  });

  it(`should have an unknown secret token`, (): void => {
    expect.assertions(1);

    expect(service.secretToken).toStrictEqual(`unknown`);
  });
});
