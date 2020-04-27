import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordLoggerService } from "./discord-logger.service";

describe(`DiscordLoggerService`, (): void => {
  let service: DiscordLoggerService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordLogger service`, (): void => {
      expect.assertions(1);

      service = DiscordLoggerService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordLoggerService));
    });

    it(`should return the created DiscordLogger service`, (): void => {
      expect.assertions(1);

      const result = DiscordLoggerService.getInstance();

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

    it(`should notify the DiscordLogger service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordLoggerService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_LOGGER_SERVICE
      );
    });
  });
});
