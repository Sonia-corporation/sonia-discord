import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { LoggerConfigCoreService } from "./logger-config-core.service";
import { LoggerConfigService } from "./logger-config.service";

describe(`LoggerConfigService`, (): void => {
  let service: LoggerConfigService;
  let loggerConfigCoreService: LoggerConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a LoggerConfig service`, (): void => {
      expect.assertions(1);

      service = LoggerConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(LoggerConfigService));
    });

    it(`should return the created LoggerConfig service`, (): void => {
      expect.assertions(1);

      const result = LoggerConfigService.getInstance();

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

    it(`should notify the LoggerConfig service creation`, (): void => {
      expect.assertions(2);

      service = new LoggerConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.LOGGER_CONFIG_SERVICE
      );
    });
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      service = LoggerConfigService.getInstance();
      loggerConfigCoreService.isEnabled = true;
      loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
    });

    it(`should return the logger config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        isEnabled: true,
        level: LoggerConfigLevelEnum.DEBUG,
      } as ILoggerConfig);
    });
  });

  describe(`isEnabled()`, (): void => {
    beforeEach((): void => {
      service = LoggerConfigService.getInstance();
      loggerConfigCoreService.isEnabled = true;
    });

    describe(`when the logger config is enabled`, (): void => {
      beforeEach((): void => {
        loggerConfigCoreService.isEnabled = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isEnabledResult = service.isEnabled();

        expect(isEnabledResult).toStrictEqual(true);
      });
    });

    describe(`when the logger config is not enabled`, (): void => {
      beforeEach((): void => {
        loggerConfigCoreService.isEnabled = false;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isEnabledResult = service.isEnabled();

        expect(isEnabledResult).toStrictEqual(false);
      });
    });
  });

  describe(`getLevel()`, (): void => {
    beforeEach((): void => {
      service = LoggerConfigService.getInstance();
      loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
    });

    it(`should return the logger config level`, (): void => {
      expect.assertions(1);

      const result = service.getLevel();

      expect(result).toStrictEqual(LoggerConfigLevelEnum.DEBUG);
    });
  });
});
