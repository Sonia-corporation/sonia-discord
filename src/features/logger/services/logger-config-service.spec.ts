import { IConfigUpdateBoolean } from "../../config/interfaces/config-update-boolean";
import { IConfigUpdateString } from "../../config/interfaces/config-update-string";
import { ConfigService } from "../../config/services/config-service";
import { LOGGER_CONFIG } from "../constants/logger-config";
import { LoggerConfigLevelEnum } from "../enums/logger-config-level.enum";
import { ILoggerConfig } from "../interfaces/logger-config";
import { LoggerConfigService } from "./logger-config-service";

jest.mock(`../../config/services/config-service`);

describe(`LoggerConfigService`, (): void => {
  let service: LoggerConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = LoggerConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getLogger()`, (): void => {
    beforeEach((): void => {
      LOGGER_CONFIG.isEnabled = true;
      LOGGER_CONFIG.level = LoggerConfigLevelEnum.DEBUG;
    });

    it(`should return the logger config`, (): void => {
      expect.assertions(1);

      const result = service.getLogger();

      expect(result).toStrictEqual({
        isEnabled: true,
        level: LoggerConfigLevelEnum.DEBUG,
      } as ILoggerConfig);
    });
  });

  describe(`isEnabled()`, (): void => {
    beforeEach((): void => {
      LOGGER_CONFIG.isEnabled = true;
    });

    describe(`when the logger config is enabled`, (): void => {
      beforeEach((): void => {
        LOGGER_CONFIG.isEnabled = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isEnabled();

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the logger config is not enabled`, (): void => {
      beforeEach((): void => {
        LOGGER_CONFIG.isEnabled = false;
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
      LOGGER_CONFIG.level = LoggerConfigLevelEnum.DEBUG;
    });

    it(`should return the logger config level`, (): void => {
      expect.assertions(1);

      const result = service.getLevel();

      expect(result).toStrictEqual(LoggerConfigLevelEnum.DEBUG);
    });
  });

  describe(`updateEnabledState()`, (): void => {
    let isEnabled: boolean;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      isEnabled = true;
      LOGGER_CONFIG.isEnabled = false;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateEnabledState(isEnabled);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `LoggerConfigService`,
        newValue: true,
        oldValue: false,
        valueName: `enable state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the logger config enable state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateEnabledState(isEnabled);

      expect(LOGGER_CONFIG.isEnabled).toStrictEqual(true);
    });
  });

  describe(`updateLevel()`, (): void => {
    let level: LoggerConfigLevelEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      level = LoggerConfigLevelEnum.DEBUG;
      LOGGER_CONFIG.level = LoggerConfigLevelEnum.SUCCESS;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(LoggerConfigLevelEnum.DEBUG);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateLevel(level);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `LoggerConfigService`,
        newValue: LoggerConfigLevelEnum.DEBUG,
        oldValue: LoggerConfigLevelEnum.SUCCESS,
        valueName: `level`,
      } as IConfigUpdateString<LoggerConfigLevelEnum>);
    });

    it(`should update the logger config enable state with the updated string`, (): void => {
      expect.assertions(1);

      service.updateLevel(level);

      expect(LOGGER_CONFIG.level).toStrictEqual(LoggerConfigLevelEnum.DEBUG);
    });
  });
});
