import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateBoolean } from "../../../config/interfaces/config-update-boolean";
import { IConfigUpdateNumber } from "../../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config.service";
import { CoreEventService } from "../../../core/services/core-event.service";
import { LoggerService } from "../../../logger/services/logger.service";
import * as IsNodeProductionModule from "../../../node/functions/is-node-production";
import { TimeService } from "../../../time/services/time.service";
import { IAppConfig } from "../../interfaces/app-config";
import { AppConfigCoreService } from "./app-config-core.service";
import { AppConfigMutatorService } from "./app-config-mutator.service";
import { AppConfigService } from "./app-config.service";

jest.mock(`../../../time/services/time.service`);
jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`AppConfigMutationService`, (): void => {
  let service: AppConfigMutatorService;
  let configService: ConfigService;
  let appConfigCoreService: AppConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    appConfigCoreService = AppConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IAppConfig> | undefined;

    beforeEach((): void => {
      config = {
        firstReleaseDate: `dummy-first-release-date`,
        initializationDate: `dummy-initialization-date`,
        isProduction: true,
        releaseDate: `dummy-release-date`,
        releaseNotes: `dummy-release-notes`,
        totalReleaseCount: 88,
        version: `dummy-version`,
      };
    });

    it(`should create a AppConfigMutator service`, (): void => {
      expect.assertions(1);

      service = AppConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(expect.any(AppConfigMutatorService));
    });

    it(`should return the created AppConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = AppConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IAppConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the AppConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new AppConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.APP_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current first release date`, (): void => {
        expect.assertions(1);
        appConfigCoreService.firstReleaseDate = `firstReleaseDate`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.firstReleaseDate).toStrictEqual(
          `firstReleaseDate`
        );
      });

      it(`should not update the current initialization date`, (): void => {
        expect.assertions(1);
        appConfigCoreService.initializationDate = `initializationDate`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.initializationDate).toStrictEqual(
          `initializationDate`
        );
      });

      it(`should not update the current production state`, (): void => {
        expect.assertions(1);
        appConfigCoreService.isProduction = false;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.isProduction).toStrictEqual(false);
      });

      it(`should not update the current release date`, (): void => {
        expect.assertions(1);
        appConfigCoreService.releaseDate = `releaseDate`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.releaseDate).toStrictEqual(`releaseDate`);
      });

      it(`should not update the current release notes`, (): void => {
        expect.assertions(1);
        appConfigCoreService.releaseNotes = `releaseNotes`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.releaseNotes).toStrictEqual(`releaseNotes`);
      });

      it(`should not update the current total release count`, (): void => {
        expect.assertions(1);
        appConfigCoreService.totalReleaseCount = 8;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.totalReleaseCount).toStrictEqual(8);
      });

      it(`should not update the current version`, (): void => {
        expect.assertions(1);
        appConfigCoreService.version = `version`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.version).toStrictEqual(`version`);
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          firstReleaseDate: `dummy-first-release-date`,
          initializationDate: `dummy-initialization-date`,
          isProduction: true,
          releaseDate: `dummy-release-date`,
          releaseNotes: `dummy-release-notes`,
          totalReleaseCount: 88,
          version: `dummy-version`,
        };
      });

      it(`should override the first release date`, (): void => {
        expect.assertions(1);
        appConfigCoreService.firstReleaseDate = `firstReleaseDate`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.firstReleaseDate).toStrictEqual(
          `dummy-first-release-date`
        );
      });

      it(`should override the initialization date`, (): void => {
        expect.assertions(1);
        appConfigCoreService.initializationDate = `initializationDate`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.initializationDate).toStrictEqual(
          `dummy-initialization-date`
        );
      });

      it(`should override the production state`, (): void => {
        expect.assertions(1);
        appConfigCoreService.isProduction = false;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.isProduction).toStrictEqual(true);
      });

      it(`should override the release date`, (): void => {
        expect.assertions(1);
        appConfigCoreService.releaseDate = `releaseDate`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.releaseDate).toStrictEqual(
          `dummy-release-date`
        );
      });

      it(`should override the release notes`, (): void => {
        expect.assertions(1);
        appConfigCoreService.releaseNotes = `releaseNotes`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.releaseNotes).toStrictEqual(
          `dummy-release-notes`
        );
      });

      it(`should override the total release count`, (): void => {
        expect.assertions(1);
        appConfigCoreService.totalReleaseCount = 0;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.totalReleaseCount).toStrictEqual(88);
      });

      it(`should override the version`, (): void => {
        expect.assertions(1);
        appConfigCoreService.version = `version`;

        service = new AppConfigMutatorService(config);

        expect(appConfigCoreService.version).toStrictEqual(`dummy-version`);
      });
    });
  });

  describe(`init()`, (): void => {
    let isNodeProductionSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();

      isNodeProductionSpy = jest.spyOn(
        IsNodeProductionModule,
        `isNodeProduction`
      );
    });

    describe(`when the app is running on production command line`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = false;

        isNodeProductionSpy.mockReturnValue(true);
      });

      it(`should update the config production state`, (): void => {
        expect.assertions(1);

        service.init();

        expect(appConfigCoreService.isProduction).toStrictEqual(true);
      });
    });

    describe(`when the app is not running on production command line`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = true;

        isNodeProductionSpy.mockReturnValue(false);
      });

      it(`should update the config production state`, (): void => {
        expect.assertions(1);

        service.init();

        expect(appConfigCoreService.isProduction).toStrictEqual(false);
      });
    });

    describe(`when the app is running on production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = `today`;

        isNodeProductionSpy.mockReturnValue(true);
      });

      it(`should not update the config initialization date`, (): void => {
        expect.assertions(1);

        service.init();

        expect(appConfigCoreService.initializationDate).toStrictEqual(`today`);
      });
    });

    describe(`when the app is not running on production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = `today`;

        isNodeProductionSpy.mockReturnValue(false);
      });

      it(`should update the config initialization date to now`, (): void => {
        expect.assertions(1);

        service.init();

        expect(appConfigCoreService.initializationDate).toStrictEqual(`now`);
      });
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.init();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let timeServiceGetInstanceSpy: jest.SpyInstance;
    let appConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let appConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      timeServiceGetInstanceSpy = jest.spyOn(TimeService, `getInstance`);
      appConfigCoreServiceGetInstanceSpy = jest.spyOn(
        AppConfigCoreService,
        `getInstance`
      );
      appConfigServiceGetInstanceSpy = jest.spyOn(
        AppConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the Time service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(timeServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(timeServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the AppConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(appConfigCoreServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(appConfigCoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the AppConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(appConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(appConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IAppConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      appConfigCoreService.firstReleaseDate = `dummy-first-release-date`;
      appConfigCoreService.initializationDate = `dummy-initialization-date`;
      appConfigCoreService.isProduction = true;
      appConfigCoreService.releaseDate = `dummy-release-date`;
      appConfigCoreService.releaseNotes = `dummy-release-notes`;
      appConfigCoreService.totalReleaseCount = 8;
      appConfigCoreService.version = `dummy-version`;

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(7);

      service.updateConfig();

      expect(appConfigCoreService.firstReleaseDate).toStrictEqual(
        `dummy-first-release-date`
      );
      expect(appConfigCoreService.initializationDate).toStrictEqual(
        `dummy-initialization-date`
      );
      expect(appConfigCoreService.isProduction).toStrictEqual(true);
      expect(appConfigCoreService.releaseDate).toStrictEqual(
        `dummy-release-date`
      );
      expect(appConfigCoreService.releaseNotes).toStrictEqual(
        `dummy-release-notes`
      );
      expect(appConfigCoreService.totalReleaseCount).toStrictEqual(8);
      expect(appConfigCoreService.version).toStrictEqual(`dummy-version`);
    });

    it(`should not log about the config update`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(loggerLogSpy).not.toHaveBeenCalled();
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(7);

        service.updateConfig(config);

        expect(appConfigCoreService.firstReleaseDate).toStrictEqual(
          `dummy-first-release-date`
        );
        expect(appConfigCoreService.initializationDate).toStrictEqual(
          `dummy-initialization-date`
        );
        expect(appConfigCoreService.isProduction).toStrictEqual(true);
        expect(appConfigCoreService.releaseDate).toStrictEqual(
          `dummy-release-date`
        );
        expect(appConfigCoreService.releaseNotes).toStrictEqual(
          `dummy-release-notes`
        );
        expect(appConfigCoreService.totalReleaseCount).toStrictEqual(8);
        expect(appConfigCoreService.version).toStrictEqual(`dummy-version`);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given config contains a first release date`, (): void => {
      beforeEach((): void => {
        config = {
          firstReleaseDate: `first-release-date`,
        };
      });

      it(`should update the config first release date`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.firstReleaseDate).toStrictEqual(
          `first-release-date`
        );
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains an initialization date`, (): void => {
      beforeEach((): void => {
        config = {
          initializationDate: `initialization-date`,
        };
      });

      it(`should update the config initialization date`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.initializationDate).toStrictEqual(
          `initialization-date`
        );
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a production state`, (): void => {
      beforeEach((): void => {
        config = {
          isProduction: false,
        };
      });

      it(`should update the config production state`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.isProduction).toStrictEqual(false);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a release date`, (): void => {
      beforeEach((): void => {
        config = {
          releaseDate: `release-date`,
        };
      });

      it(`should update the config release date`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.releaseDate).toStrictEqual(`release-date`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a release notes`, (): void => {
      beforeEach((): void => {
        config = {
          releaseNotes: `release-notes`,
        };
      });

      it(`should update the config release notes`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.releaseNotes).toStrictEqual(
          `release-notes`
        );
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a total release count`, (): void => {
      beforeEach((): void => {
        config = {
          totalReleaseCount: 9,
        };
      });

      it(`should update the config total release count`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.totalReleaseCount).toStrictEqual(9);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });

    describe(`when the given config contains a version`, (): void => {
      beforeEach((): void => {
        config = {
          version: `version`,
        };
      });

      it(`should update the config version`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(appConfigCoreService.version).toStrictEqual(`version`);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(2);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[AppConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateFirstReleaseDate()`, (): void => {
    let firstReleaseDate: string;

    let configServiceGetUpdatedDateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      firstReleaseDate = `dummy-first-release-date`;
      appConfigCoreService.firstReleaseDate = `first-release-date`;

      configServiceGetUpdatedDateSpy = jest
        .spyOn(configService, `getUpdatedDate`)
        .mockReturnValue(`dummy-first-release-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateFirstReleaseDate(firstReleaseDate);

      expect(configServiceGetUpdatedDateSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedDateSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        newValue: `dummy-first-release-date`,
        oldValue: `first-release-date`,
        valueName: `first release date`,
      } as IConfigUpdateString);
    });

    it(`should update the app config first release date with the updated string`, (): void => {
      expect.assertions(1);

      service.updateFirstReleaseDate(firstReleaseDate);

      expect(appConfigCoreService.firstReleaseDate).toStrictEqual(
        `dummy-first-release-date`
      );
    });
  });

  describe(`updateInitializationDate()`, (): void => {
    let initializationDate: string;

    let configServiceGetUpdatedDateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      initializationDate = `dummy-initialization-date`;
      appConfigCoreService.initializationDate = `initialization-date`;

      configServiceGetUpdatedDateSpy = jest
        .spyOn(configService, `getUpdatedDate`)
        .mockReturnValue(`dummy-initialization-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateInitializationDate(initializationDate);

      expect(configServiceGetUpdatedDateSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedDateSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        newValue: `dummy-initialization-date`,
        oldValue: `initialization-date`,
        valueName: `initialization date`,
      } as IConfigUpdateString);
    });

    it(`should update the app config initialization date with the updated string`, (): void => {
      expect.assertions(1);

      service.updateInitializationDate(initializationDate);

      expect(appConfigCoreService.initializationDate).toStrictEqual(
        `dummy-initialization-date`
      );
    });
  });

  describe(`updateProductionState()`, (): void => {
    let isProduction: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      isProduction = false;
      appConfigCoreService.isProduction = true;

      configServiceGetUpdatedBooleanSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(false);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateProductionState(isProduction);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        newValue: false,
        oldValue: true,
        valueName: `production state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the app config production state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateProductionState(isProduction);

      expect(appConfigCoreService.isProduction).toStrictEqual(false);
    });
  });

  describe(`updateReleaseDate()`, (): void => {
    let releaseDate: string;

    let configServiceGetUpdatedDateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      releaseDate = `dummy-release-date`;
      appConfigCoreService.releaseDate = `release-date`;

      configServiceGetUpdatedDateSpy = jest
        .spyOn(configService, `getUpdatedDate`)
        .mockReturnValue(`dummy-release-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateReleaseDate(releaseDate);

      expect(configServiceGetUpdatedDateSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedDateSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        newValue: `dummy-release-date`,
        oldValue: `release-date`,
        valueName: `release date`,
      } as IConfigUpdateString);
    });

    it(`should update the app config release date with the updated string`, (): void => {
      expect.assertions(1);

      service.updateReleaseDate(releaseDate);

      expect(appConfigCoreService.releaseDate).toStrictEqual(
        `dummy-release-date`
      );
    });
  });

  describe(`updateReleaseNotes()`, (): void => {
    let releaseNotes: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      releaseNotes = `dummy-release-notes`;
      appConfigCoreService.releaseNotes = `release-notes`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-release-notes`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateReleaseNotes(releaseNotes);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        isValueDisplay: false,
        newValue: `dummy-release-notes`,
        oldValue: `release-notes`,
        valueName: `release notes`,
      } as IConfigUpdateString);
    });

    it(`should update the app config release notes with the updated string`, (): void => {
      expect.assertions(1);

      service.updateReleaseNotes(releaseNotes);

      expect(appConfigCoreService.releaseNotes).toStrictEqual(
        `dummy-release-notes`
      );
    });
  });

  describe(`updateTotalReleaseCount()`, (): void => {
    let totalReleaseCount: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      totalReleaseCount = 8;
      appConfigCoreService.totalReleaseCount = 5;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateTotalReleaseCount(totalReleaseCount);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        newValue: 8,
        oldValue: 5,
        valueName: `total release count`,
      } as IConfigUpdateNumber);
    });

    it(`should update the app config total release count with the updated number`, (): void => {
      expect.assertions(1);

      service.updateTotalReleaseCount(totalReleaseCount);

      expect(appConfigCoreService.totalReleaseCount).toStrictEqual(8);
    });
  });

  describe(`updateVersion()`, (): void => {
    let version: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = AppConfigMutatorService.getInstance();
      version = `dummy-version`;
      appConfigCoreService.version = `version`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-version`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateVersion(version);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `AppConfigMutatorService`,
        newValue: `dummy-version`,
        oldValue: `version`,
        valueName: `version`,
      } as IConfigUpdateString);
    });

    it(`should update the app config version with the updated string`, (): void => {
      expect.assertions(1);

      service.updateVersion(version);

      expect(appConfigCoreService.version).toStrictEqual(`dummy-version`);
    });
  });
});
