import { DiscordMessageCommandFeatureNoonConfigCoreService } from './discord-message-command-feature-noon-config-core.service';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../../../core/services/core-event.service';

describe(`DiscordMessageCommandFeatureNoonConfigCoreService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureNoonConfigCore service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureNoonConfigCoreService));
    });

    it(`should return the created DiscordMessageCommandFeatureNoonConfigCore service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureNoonConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should have a specific color for the image of the feature noon command`, (): void => {
    expect.assertions(1);

    service = DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();

    expect(service.noon.imageColor).toStrictEqual(15718590);
  });

  it(`should have a specific url for the image of the feature noon command`, (): void => {
    expect.assertions(1);

    service = DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();

    expect(service.noon.imageUrl).toStrictEqual(`https://i.ibb.co/S7BxtDh/icons8-alarm-512.png`);
  });
});
