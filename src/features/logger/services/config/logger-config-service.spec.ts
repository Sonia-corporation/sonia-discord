import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { LoggerConfigCoreService } from "./logger-config-core-service";
import { LoggerConfigService } from "./logger-config-service";

jest.mock(`../../../config/services/config-service`);

describe(`LoggerConfigService`, (): void => {
  let service: LoggerConfigService;
  let loggerConfigCoreService: LoggerConfigCoreService;

  beforeEach((): void => {
    service = LoggerConfigService.getInstance();
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
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
      loggerConfigCoreService.isEnabled = true;
    });

    describe(`when the logger config is enabled`, (): void => {
      beforeEach((): void => {
        loggerConfigCoreService.isEnabled = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isEnabled();

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the logger config is not enabled`, (): void => {
      beforeEach((): void => {
        loggerConfigCoreService.isEnabled = false;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isEnabled();

        expect(result).toStrictEqual(false);
      });
    });
  });

  describe(`getLevel()`, (): void => {
    beforeEach((): void => {
      loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
    });

    it(`should return the logger config level`, (): void => {
      expect.assertions(1);

      const result = service.getLevel();

      expect(result).toStrictEqual(LoggerConfigLevelEnum.DEBUG);
    });
  });
});
