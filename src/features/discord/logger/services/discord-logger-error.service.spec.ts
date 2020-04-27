import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordLoggerErrorService } from "./discord-logger-error.service";

describe(`DiscordLoggerErrorService`, (): void => {
  let service: DiscordLoggerErrorService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordLoggerError service`, (): void => {
      expect.assertions(1);

      service = DiscordLoggerErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordLoggerErrorService));
    });

    it(`should return the created DiscordLoggerError service`, (): void => {
      expect.assertions(1);

      const result = DiscordLoggerErrorService.getInstance();

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

    it(`should notify the DiscordLoggerError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordLoggerErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE
      );
    });
  });
});
