import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordLoggerWarningService } from "./discord-logger-warning.service";

describe(`DiscordLoggerWarningService`, (): void => {
  let service: DiscordLoggerWarningService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordLoggerWarning service`, (): void => {
      expect.assertions(1);

      service = DiscordLoggerWarningService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordLoggerWarningService));
    });

    it(`should return the created DiscordLoggerWarning service`, (): void => {
      expect.assertions(1);

      const result = DiscordLoggerWarningService.getInstance();

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

    it(`should notify the DiscordLoggerWarning service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordLoggerWarningService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_LOGGER_WARNING_SERVICE
      );
    });
  });
});
