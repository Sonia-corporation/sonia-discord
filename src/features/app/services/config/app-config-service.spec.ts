import { IAppConfig } from "../../interfaces/app-config";
import { AppConfigCoreService } from "./app-config-core-service";
import { AppConfigService } from "./app-config-service";

jest.mock(`../../../config/services/config-service`);

describe(`AppConfigService`, (): void => {
  let service: AppConfigService;
  let appConfigCoreService: AppConfigCoreService;

  beforeEach((): void => {
    service = AppConfigService.getInstance();
    appConfigCoreService = AppConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      appConfigCoreService.initializationDate = `dummy-initialization-date`;
      appConfigCoreService.isProduction = false;
      appConfigCoreService.releaseDate = `dummy-release-date`;
      appConfigCoreService.releaseNotes = `dummy-release-notes`;
      appConfigCoreService.totalReleaseCount = 0;
      appConfigCoreService.version = `dummy-version`;
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
      appConfigCoreService.version = `dummy-version`;
    });

    it(`should return the app config version`, (): void => {
      expect.assertions(1);

      const result = service.getVersion();

      expect(result).toStrictEqual(`dummy-version`);
    });
  });

  describe(`getReleaseDate()`, (): void => {
    beforeEach((): void => {
      appConfigCoreService.releaseDate = `dummy-release-date`;
    });

    it(`should return the app config release date`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseDate();

      expect(result).toStrictEqual(`dummy-release-date`);
    });
  });

  describe(`getInitializationDate()`, (): void => {
    beforeEach((): void => {
      appConfigCoreService.initializationDate = `dummy-initialization-date`;
    });

    it(`should return the app config initialization date`, (): void => {
      expect.assertions(1);

      const result = service.getInitializationDate();

      expect(result).toStrictEqual(`dummy-initialization-date`);
    });
  });

  describe(`isProduction()`, (): void => {
    beforeEach((): void => {
      appConfigCoreService.isProduction = false;
    });

    describe(`when the app is not in production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = false;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isProduction();

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the app is in production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isProduction();

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`getTotalReleaseCount()`, (): void => {
    beforeEach((): void => {
      appConfigCoreService.totalReleaseCount = 8;
    });

    it(`should return the app config total release count`, (): void => {
      expect.assertions(1);

      const result = service.getTotalReleaseCount();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getReleaseNotes()`, (): void => {
    beforeEach((): void => {
      appConfigCoreService.releaseNotes = `dummy-release-notes`;
    });

    it(`should return the app config release notes`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseNotes();

      expect(result).toStrictEqual(`dummy-release-notes`);
    });
  });
});
