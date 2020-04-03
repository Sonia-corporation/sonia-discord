import { PartialNested } from "../../../../types/partial-nested";
import { IConfigUpdateBoolean } from "../../../config/interfaces/config-update-boolean";
import { IConfigUpdateNumber } from "../../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import * as IsNodeProductionModule from "../../../node/functions/is-node-production";
import { IAppConfig } from "../../interfaces/app-config";
import { AppConfigCoreService } from "./app-config-core-service";
import { AppConfigMutatorService } from "./app-config-mutator-service";

jest.mock(`../../../config/services/config-service`);
jest.mock(`../../../time/services/time-service`);

describe(`AppConfigMutationService`, (): void => {
  let service: AppConfigMutatorService;
  let configService: ConfigService;
  let appConfigCoreService: AppConfigCoreService;

  beforeEach((): void => {
    service = AppConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    appConfigCoreService = AppConfigCoreService.getInstance();
  });

  describe(`init()`, (): void => {
    let isNodeProductionSpy: jest.SpyInstance;

    beforeEach((): void => {
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
        appConfigCoreService.isProduction = true;
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
        appConfigCoreService.isProduction = false;
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

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IAppConfig> | undefined;

    beforeEach((): void => {
      appConfigCoreService.initializationDate = `dummy-initialization-date`;
      appConfigCoreService.isProduction = true;
      appConfigCoreService.releaseDate = `dummy-release-date`;
      appConfigCoreService.releaseNotes = `dummy-release-notes`;
      appConfigCoreService.totalReleaseCount = 8;
      appConfigCoreService.version = `dummy-version`;
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(6);

        service.updateConfig(config);

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
    });
  });

  describe(`updateVersion()`, (): void => {
    let version: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
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

  describe(`updateReleaseDate()`, (): void => {
    let releaseDate: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      releaseDate = `dummy-release-date`;
      appConfigCoreService.releaseDate = `release-date`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-release-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateReleaseDate(releaseDate);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
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

  describe(`updateInitializationDate()`, (): void => {
    let initializationDate: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      initializationDate = `dummy-initialization-date`;
      appConfigCoreService.initializationDate = `initialization-date`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-initialization-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateInitializationDate(initializationDate);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
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

  describe(`updateTotalReleaseCount()`, (): void => {
    let totalReleaseCount: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
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

  describe(`updateReleaseNotes()`, (): void => {
    let releaseNotes: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
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
});
