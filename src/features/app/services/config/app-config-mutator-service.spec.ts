import { IConfigUpdateBoolean } from "../../../config/interfaces/config-update-boolean";
import { IConfigUpdateNumber } from "../../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../config/services/config-service";
import { AppConfigCoreService } from "./app-config-core-service";
import { AppConfigMutatorService } from "./app-config-mutator-service";

jest.mock(`../../../config/services/config-service`);

describe(`AppConfigMutationService`, (): void => {
  let service: AppConfigMutatorService;
  let configService: ConfigService;
  let appConfigCoreService: AppConfigCoreService;

  beforeEach((): void => {
    service = AppConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    appConfigCoreService = AppConfigCoreService.getInstance();
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
