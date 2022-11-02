import { DiscordSoniaConfigCoreService } from './discord-sonia-config-core.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';

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

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SONIA_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should have a corporation image url`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationImageUrl).toBe(`https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`);
  });

  it(`should have a corporation message embed author icon url`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationMessageEmbedAuthor.iconURL).toBe(`https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`);
  });

  it(`should have a corporation message embed author name`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationMessageEmbedAuthor.name).toBe(`Sonia`);
  });

  it(`should have a corporation message embed author url`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.corporationMessageEmbedAuthor.url).toBe(`https://github.com/Sonia-corporation?type=source`);
  });

  it(`should have an empty dev guild id whitelist`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.devGuildIdWhitelist).toStrictEqual([]);
  });

  it(`should have an unknown id`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.id).toBe(`unknown`);
  });

  it(`should have an unknown secret token`, (): void => {
    expect.assertions(1);

    service = DiscordSoniaConfigCoreService.getInstance();

    expect(service.secretToken).toBe(`unknown`);
  });
});
