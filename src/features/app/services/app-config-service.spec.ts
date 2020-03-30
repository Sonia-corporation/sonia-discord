import moment from "moment";
import { IConfigUpdateBoolean } from "../../config/interfaces/config-update-boolean";
import { IConfigUpdateNumber } from "../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../config/interfaces/config-update-string";
import { ConfigService } from "../../config/services/config-service";
import { APP_CONFIG } from "../constants/app-config";
import { IAppConfig } from "../interfaces/app-config";
import { AppConfigService } from "./app-config-service";

jest.mock(`../../config/services/config-service`);

describe(`AppConfigService`, (): void => {
  let service: AppConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = AppConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.initializationDate = `dummy-initialization-date`;
      APP_CONFIG.isProduction = false;
      APP_CONFIG.releaseDate = `dummy-release-date`;
      APP_CONFIG.releaseNotes = `dummy-release-notes`;
      APP_CONFIG.totalReleaseCount = 0;
      APP_CONFIG.version = `dummy-version`;
    });

    it(`should return the app config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        initializationDate: `dummy-initialization-date`,
        isProduction: false,
        releaseDate: `dummy-release-date`,
        releaseNotes: `dummy-release-notes`,
        totalReleaseCount: 0,
        version: `dummy-version`,
      } as IAppConfig);
    });
  });

  describe(`getVersion()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.version = `dummy-version`;
    });

    it(`should return the app config version`, (): void => {
      expect.assertions(1);

      const result = service.getVersion();

      expect(result).toStrictEqual(`dummy-version`);
    });
  });

  describe(`updateVersion()`, (): void => {
    let version: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      version = `dummy-version`;
      APP_CONFIG.version = `version`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-version`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateVersion(version);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `AppConfigService`,
        newValue: `dummy-version`,
        oldValue: `version`,
        valueName: `version`,
      } as IConfigUpdateString);
    });

    it(`should update the app config version with the updated string`, (): void => {
      expect.assertions(1);

      service.updateVersion(version);

      expect(APP_CONFIG.version).toStrictEqual(`dummy-version`);
    });
  });

  describe(`getReleaseDate()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.releaseDate = `dummy-release-date`;
    });

    it(`should return the app config release date`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseDate();

      expect(result).toStrictEqual(`dummy-release-date`);
    });
  });

  describe(`getReleaseDateHumanized()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.releaseDate = `dummy-release-date`;
    });

    describe(`when the app config release date is an empty string`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.releaseDate = ``;
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when the app config release date is "unknown"`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.releaseDate = `unknown`;
      });

      it(`should return "unknown"`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`unknown`);
      });
    });

    describe(`when the app config release date is a date as now`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.releaseDate = moment().format();
      });

      it(`should return the app config release date capitalized and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`A few seconds ago`);
      });
    });

    describe(`when the app config release date is a date as one hour`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.releaseDate = moment().subtract(1, `hour`).format();
      });

      it(`should return the app config release date capitalized and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`An hour ago`);
      });
    });

    describe(`when the app config release date is a date as two hours`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.releaseDate = moment().subtract(2, `hour`).format();
      });

      it(`should return the app config release date capitalized and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`2 hours ago`);
      });
    });
  });

  describe(`updateReleaseDate()`, (): void => {
    let releaseDate: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      releaseDate = `dummy-release-date`;
      APP_CONFIG.releaseDate = `release-date`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-release-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateReleaseDate(releaseDate);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `AppConfigService`,
        newValue: `dummy-release-date`,
        oldValue: `release-date`,
        valueName: `release date`,
      } as IConfigUpdateString);
    });

    it(`should update the app config release date with the updated string`, (): void => {
      expect.assertions(1);

      service.updateReleaseDate(releaseDate);

      expect(APP_CONFIG.releaseDate).toStrictEqual(`dummy-release-date`);
    });
  });

  describe(`getInitializationDate()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.initializationDate = `dummy-initialization-date`;
    });

    it(`should return the app config initialization date`, (): void => {
      expect.assertions(1);

      const result = service.getInitializationDate();

      expect(result).toStrictEqual(`dummy-initialization-date`);
    });
  });

  describe(`getInitializationDateHumanized()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.initializationDate = `dummy-initialization-date`;
    });

    describe(`when the app config initialization date is an empty string`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.initializationDate = ``;
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when the app config initialization date is "unknown"`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.initializationDate = `unknown`;
      });

      it(`should return "unknown"`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`unknown`);
      });
    });

    describe(`when the app config initialization date is a date as now`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.initializationDate = moment().format();
      });

      it(`should return the app config initialization date capitalized and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`A few seconds ago`);
      });
    });

    describe(`when the app config initialization date is a date as one hour`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.initializationDate = moment().subtract(1, `hour`).format();
      });

      it(`should return the app config initialization date capitalized and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`An hour ago`);
      });
    });

    describe(`when the app config initialization date is a date as two hours`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.initializationDate = moment().subtract(2, `hour`).format();
      });

      it(`should return the app config initialization date capitalized and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`2 hours ago`);
      });
    });
  });

  describe(`updateInitializationDate()`, (): void => {
    let initializationDate: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      initializationDate = `dummy-initialization-date`;
      APP_CONFIG.initializationDate = `initialization-date`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-initialization-date`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateInitializationDate(initializationDate);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `AppConfigService`,
        newValue: `dummy-initialization-date`,
        oldValue: `initialization-date`,
        valueName: `initialization date`,
      } as IConfigUpdateString);
    });

    it(`should update the app config initialization date with the updated string`, (): void => {
      expect.assertions(1);

      service.updateInitializationDate(initializationDate);

      expect(APP_CONFIG.initializationDate).toStrictEqual(
        `dummy-initialization-date`
      );
    });
  });

  describe(`isProduction()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.isProduction = false;
    });

    describe(`when the app is not in production`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.isProduction = false;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isProduction();

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the app is in production`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.isProduction = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isProduction();

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`getProductionStateHumanized()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.isProduction = false;
    });

    describe(`when the app is not in production`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.isProduction = false;
      });

      it(`should return "development"`, (): void => {
        expect.assertions(1);

        const result = service.getProductionStateHumanized();

        expect(result).toStrictEqual(`development`);
      });
    });

    describe(`when the app is in production`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.isProduction = true;
      });

      it(`should return "production"`, (): void => {
        expect.assertions(1);

        const result = service.getProductionStateHumanized();

        expect(result).toStrictEqual(`production`);
      });
    });
  });

  describe(`updateProductionState()`, (): void => {
    let isProduction: boolean;

    let configServiceGetUpdatedBooleanSpy: jest.SpyInstance;

    beforeEach((): void => {
      isProduction = false;
      APP_CONFIG.isProduction = true;

      configServiceGetUpdatedBooleanSpy = jest
        .spyOn(configService, `getUpdatedBoolean`)
        .mockReturnValue(false);
    });

    it(`should get the updated boolean`, (): void => {
      expect.assertions(2);

      service.updateProductionState(isProduction);

      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedBooleanSpy).toHaveBeenCalledWith({
        context: `AppConfigService`,
        newValue: false,
        oldValue: true,
        valueName: `production state`,
      } as IConfigUpdateBoolean);
    });

    it(`should update the app config production state with the updated boolean`, (): void => {
      expect.assertions(1);

      service.updateProductionState(isProduction);

      expect(APP_CONFIG.isProduction).toStrictEqual(false);
    });
  });

  describe(`getTotalReleaseCount()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.totalReleaseCount = 8;
    });

    it(`should return the app config total release count`, (): void => {
      expect.assertions(1);

      const result = service.getTotalReleaseCount();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getTotalReleaseCountHumanized()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.totalReleaseCount = 8;
    });

    describe(`when the app config total release count is 0`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.totalReleaseCount = 0;
      });

      it(`should return "0 version"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`0 version`);
      });
    });

    describe(`when the app config total release count is 1`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.totalReleaseCount = 1;
      });

      it(`should return "1 version"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`1 version`);
      });
    });

    describe(`when the app config total release count is 2`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.totalReleaseCount = 2;
      });

      it(`should return "2 versions"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`2 versions`);
      });
    });

    describe(`when the app config total release count is 8`, (): void => {
      beforeEach((): void => {
        APP_CONFIG.totalReleaseCount = 8;
      });

      it(`should return "8 versions"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`8 versions`);
      });
    });
  });

  describe(`updateTotalReleaseCount()`, (): void => {
    let totalReleaseCount: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      totalReleaseCount = 8;
      APP_CONFIG.totalReleaseCount = 5;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateTotalReleaseCount(totalReleaseCount);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `AppConfigService`,
        newValue: 8,
        oldValue: 5,
        valueName: `total release count`,
      } as IConfigUpdateNumber);
    });

    it(`should update the app config total release count with the updated number`, (): void => {
      expect.assertions(1);

      service.updateTotalReleaseCount(totalReleaseCount);

      expect(APP_CONFIG.totalReleaseCount).toStrictEqual(8);
    });
  });

  describe(`getReleaseNotes()`, (): void => {
    beforeEach((): void => {
      APP_CONFIG.releaseNotes = `dummy-release-notes`;
    });

    it(`should return the app config release notes`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseNotes();

      expect(result).toStrictEqual(`dummy-release-notes`);
    });
  });

  describe(`updateReleaseNotes()`, (): void => {
    let releaseNotes: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      releaseNotes = `dummy-release-notes`;
      APP_CONFIG.releaseNotes = `release-notes`;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(`dummy-release-notes`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateReleaseNotes(releaseNotes);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `AppConfigService`,
        isValueDisplay: false,
        newValue: `dummy-release-notes`,
        oldValue: `release-notes`,
        valueName: `release notes`,
      } as IConfigUpdateString);
    });

    it(`should update the app config release notes with the updated string`, (): void => {
      expect.assertions(1);

      service.updateReleaseNotes(releaseNotes);

      expect(APP_CONFIG.releaseNotes).toStrictEqual(`dummy-release-notes`);
    });
  });
});
