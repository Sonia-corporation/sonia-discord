import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateBoolean } from "../../../config/interfaces/config-update-boolean";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config.service";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerConfigLevelEnum } from "../../enums/logger-config-level.enum";
import { ILoggerConfig } from "../../interfaces/logger-config";
import { ILoggerLog } from "../../interfaces/logger-log";
import { LoggerService } from "../logger.service";
import { LoggerConfigCoreService } from "./logger-config-core.service";
import { LoggerConfigMutatorService } from "./logger-config-mutator.service";
import { LoggerConfigService } from "./logger-config.service";

jest.mock(`../../../time/services/time.service`);
jest.mock(`../chalk/chalk.service`);

describe(`LoggerConfigMutatorService`, (): void => {
  let service: LoggerConfigMutatorService;
  let configService: ConfigService;
  let loggerConfigCoreService: LoggerConfigCoreService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    loggerConfigCoreService = LoggerConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<ILoggerConfig> | undefined;

    beforeEach((): void => {
      config = {
        isEnabled: true,
        level: LoggerConfigLevelEnum.DEBUG,
      };
    });

    it(`should create a LoggerConfigMutator service`, (): void => {
      expect.assertions(1);

      service = LoggerConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(LoggerConfigMutatorService));
    });

    it(`should return the created LoggerConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = LoggerConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<ILoggerConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the LoggerConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new LoggerConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.LOGGER_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current enabled state`, (): void => {
        expect.assertions(1);
        loggerConfigCoreService.isEnabled = true;

        service = new LoggerConfigMutatorService(config);

        expect(loggerConfigCoreService.isEnabled).toStrictEqual(true);
      });

      it(`should not update the current level`, (): void => {
        expect.assertions(1);
        loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;

        service = new LoggerConfigMutatorService(config);

        expect(loggerConfigCoreService.level).toStrictEqual(
          LoggerConfigLevelEnum.DEBUG
        );
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          isEnabled: true,
          level: LoggerConfigLevelEnum.DEBUG,
        };
      });

      it(`should override the enabled state`, (): void => {
        expect.assertions(1);
        loggerConfigCoreService.isEnabled = false;

        service = new LoggerConfigMutatorService(config);

        expect(loggerConfigCoreService.isEnabled).toStrictEqual(true);
      });

      it(`should override the level`, (): void => {
        expect.assertions(1);
        loggerConfigCoreService.level = LoggerConfigLevelEnum.ERROR;

        service = new LoggerConfigMutatorService(config);

        expect(loggerConfigCoreService.level).toStrictEqual(
          LoggerConfigLevelEnum.DEBUG
        );
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let loggerConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let loggerConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      loggerConfigCoreServiceGetInstanceSpy = jest.spyOn(
        LoggerConfigCoreService,
        `getInstance`
      );
      loggerConfigServiceGetInstanceSpy = jest.spyOn(
        LoggerConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the LoggerConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the LoggerConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<ILoggerConfig> | undefined;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerConfigMutatorService.getInstance();
      loggerConfigCoreService.isEnabled = true;
      loggerConfigCoreService.level = LoggerConfigLevelEnum.DEBUG;

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(2);

      service.updateConfig();

      expect(loggerConfigCoreService.isEnabled).toStrictEqual(true);
      expect(loggerConfigCoreService.level).toStrictEqual(
        LoggerConfigLevelEnum.DEBUG
      );
    });

    it(`should not log about the config update`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
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

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
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

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenLastCalledWith({
          context: `LoggerConfigMutatorService`,
          message: `text-configuration updated`,
        } as ILoggerLog);
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

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenLastCalledWith({
          context: `LoggerConfigMutatorService`,
          message: `text-configuration updated`,
        } as ILoggerLog);
      });
    });
  });

  describe(`updateEnabledState()`, (): void => {
    let isEnabled: boolean;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = LoggerConfigMutatorService.getInstance();
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
      service = LoggerConfigMutatorService.getInstance();
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
