import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { LoggerConfigCoreService } from "./logger-config-core.service";

describe(`LoggerConfigCoreService`, (): void => {
  let service: LoggerConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a LoggerConfigCore service`, (): void => {
      expect.assertions(1);

      service = LoggerConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(LoggerConfigCoreService));
    });

    it(`should return the created LoggerConfigCore service`, (): void => {
      expect.assertions(1);

      const result = LoggerConfigCoreService.getInstance();

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

    it(`should notify the LoggerConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new LoggerConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.LOGGER_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should be enabled`, (): void => {
    expect.assertions(1);

    service = LoggerConfigCoreService.getInstance();

    expect(service.isEnabled).toStrictEqual(true);
  });

  it(`should have a debug level`, (): void => {
    expect.assertions(1);

    service = LoggerConfigCoreService.getInstance();

    expect(service.level).toStrictEqual(LoggerConfigLevelEnum.DEBUG);
  });
});
