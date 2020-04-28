import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordSoniaConfigCoreService } from "./discord-sonia-config-core.service";

describe(`DiscordSoniaConfigCoreService`, (): void => {
  let service: DiscordSoniaConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordSoniaConfigCore service`, (): void => {
      expect.assertions(1);

      service = DiscordSoniaConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordSoniaConfigCoreService));
    });

    it(`should return the created DiscordSoniaConfigCore service`, (): void => {
      expect.assertions(1);

      const result = DiscordSoniaConfigCoreService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordSoniaConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordSoniaConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should have a corporation image url`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationImageUrl).toStrictEqual(
      `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`
    );
  });

  it(`should have a corporation message embed author icon url`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationMessageEmbedAuthor.iconURL).toStrictEqual(
      `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`
    );
  });

  it(`should have a corporation message embed author name`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationMessageEmbedAuthor.name).toStrictEqual(`Sonia`);
  });

  it(`should have a corporation message embed author url`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationMessageEmbedAuthor.url).toStrictEqual(
      `https://github.com/Sonia-corporation?type=source`
    );
  });

  it(`should have an unknown id`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.id).toStrictEqual(`unknown`);
  });

  it(`should have an unknown secret token`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.secretToken).toStrictEqual(`unknown`);
  });
});
