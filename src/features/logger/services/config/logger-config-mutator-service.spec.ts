import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateBoolean } from "../../../config/interfaces/config-update-boolean";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { LoggerConfigCoreService } from "./logger-config-core-service";
import { LoggerConfigMutatorService } from "./logger-config-mutator-service";

jest.mock(`../../../config/services/config-service`);
jest.mock(`../logger-service`);

describe(`LoggerConfigMutatorService`, (): void => {
  let service: LoggerConfigMutatorService;
  let configService: ConfigService;
  let loggerConfigCoreService: LoggerConfigCoreService;

  beforeEach((): void => {
    service = LoggerConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<ILoggerConfig> | undefined;

    beforeEach((): void => {
      loggerConfigCoreService.isEnabled = true;
      loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerConfigCoreService.isEnabled).toStrictEqual(true);
        expect(loggerConfigCoreService.level).toStrictEqual(
          LoggerConfigLevelEnum.DEBUG
        );
      });
    });

    describe(`when the given config contains an enable state`, (): void => {
      beforeEach((): void => {
        config = {
          isEnabled: false,
        };
      });

      it(`should update the config enable state`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerConfigCoreService.isEnabled).toStrictEqual(false);
      });
    });

    describe(`when the given config contains a level`, (): void => {
      beforeEach((): void => {
        config = {
          level: LoggerConfigLevelEnum.SUCCESS,
        };
      });

      it(`should update the config level`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerConfigCoreService.level).toStrictEqual(
          LoggerConfigLevelEnum.SUCCESS
        );
      });
    });
  });

  describe(`updateEnabledState()`, (): void => {
    let isEnabled: boolean;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      isEnabled = true;
      loggerConfigCoreService.isEnabled = false;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(true);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateEnabledState(isEnabled);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `LoggerConfigMutatorService`,
        newValue: true,
        oldValue: false,
        valueName: `enable state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the logger config enable state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateEnabledState(isEnabled);

      expect(loggerConfigCoreService.isEnabled).toStrictEqual(true);
    });
  });

  describe(`updateLevel()`, (): void => {
    let level: LoggerConfigLevelEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      level = LoggerConfigLevelEnum.DEBUG;
      loggerConfigCoreService.level = LoggerConfigLevelEnum.SUCCESS;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(LoggerConfigLevelEnum.DEBUG);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateLevel(level);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `LoggerConfigMutatorService`,
        newValue: LoggerConfigLevelEnum.DEBUG,
        oldValue: LoggerConfigLevelEnum.SUCCESS,
        valueName: `level`,
      } as IConfigUpdateString<LoggerConfigLevelEnum>);
    });

    it(`should update the logger config enable state with the updated string`, (): void => {
      expect.assertions(1);

      service.updateLevel(level);

      expect(loggerConfigCoreService.level).toStrictEqual(
        LoggerConfigLevelEnum.DEBUG
      );
    });
  });
});
