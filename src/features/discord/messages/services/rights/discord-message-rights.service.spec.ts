import { DiscordMessageRightsService } from './discord-message-rights.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';

describe(`DiscordMessageDmService`, (): void => {
  let service: DiscordMessageRightsService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageRightsService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageRightsService));
    });

    it(`should return the created DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageRightsService.getInstance();

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

    it(`should notify the DiscordMessageDm service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageRightsService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_RIGHTS_SERVICE
      );
    });
  });
});
