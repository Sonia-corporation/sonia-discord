import moment from "moment-timezone";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { AppConfigCoreService } from "./app-config-core.service";
import { AppConfigQueryService } from "./app-config-query.service";

describe(`AppConfigQueryService`, (): void => {
  let service: AppConfigQueryService;
  let appConfigCoreService: AppConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    appConfigCoreService = AppConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a AppConfigQuery service`, (): void => {
      expect.assertions(1);

      service = AppConfigQueryService.getInstance();

      expect(service).toStrictEqual(expect.any(AppConfigQueryService));
    });

    it(`should return the created AppConfigQuery service`, (): void => {
      expect.assertions(1);

      const result = AppConfigQueryService.getInstance();

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

    it(`should notify the AppConfigQuery service creation`, (): void => {
      expect.assertions(2);

      service = new AppConfigQueryService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.APP_CONFIG_QUERY_SERVICE
      );
    });
  });

  describe(`getInitializationDateHumanized()`, (): void => {
    beforeEach((): void => {
      service = AppConfigQueryService.getInstance();
      appConfigCoreService.initializationDate = `dummy-initialization-date`;
    });

    describe(`when the app config initialization date is an empty string`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = ``;
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when the app config initialization date is "unknown"`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = `unknown`;
      });

      it(`should return "unknown"`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`unknown`);
      });
    });

    describe(`when the app config initialization date is a date as now`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = moment().format();
      });

      it(`should return the app config initialization date capitalized and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`A few seconds ago`);
      });
    });

    describe(`when the app config initialization date is a date as one hour`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = moment()
          .subtract(1, `hour`)
          .format();
      });

      it(`should return the app config initialization date capitalized and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`An hour ago`);
      });
    });

    describe(`when the app config initialization date is a date as two hours`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.initializationDate = moment()
          .subtract(2, `hour`)
          .format();
      });

      it(`should return the app config initialization date capitalized and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = service.getInitializationDateHumanized();

        expect(result).toStrictEqual(`2 hours ago`);
      });
    });
  });

  describe(`getProductionStateHumanized()`, (): void => {
    beforeEach((): void => {
      service = AppConfigQueryService.getInstance();
      appConfigCoreService.isProduction = false;
    });

    describe(`when the app is not in production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = false;
      });

      it(`should return "development"`, (): void => {
        expect.assertions(1);

        const result = service.getProductionStateHumanized();

        expect(result).toStrictEqual(`development`);
      });
    });

    describe(`when the app is in production`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.isProduction = true;
      });

      it(`should return "production"`, (): void => {
        expect.assertions(1);

        const result = service.getProductionStateHumanized();

        expect(result).toStrictEqual(`production`);
      });
    });
  });

  describe(`getReleaseDateHumanized()`, (): void => {
    beforeEach((): void => {
      service = AppConfigQueryService.getInstance();
      appConfigCoreService.releaseDate = `dummy-release-date`;
    });

    describe(`when the app config release date is an empty string`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.releaseDate = ``;
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when the app config release date is "unknown"`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.releaseDate = `unknown`;
      });

      it(`should return "unknown"`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`unknown`);
      });
    });

    describe(`when the app config release date is a date as now`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.releaseDate = moment().format();
      });

      it(`should return the app config release date capitalized and humanized to a few seconds`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`A few seconds ago`);
      });
    });

    describe(`when the app config release date is a date as one hour`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.releaseDate = moment()
          .subtract(1, `hour`)
          .format();
      });

      it(`should return the app config release date capitalized and humanized to an hour`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`An hour ago`);
      });
    });

    describe(`when the app config release date is a date as two hours`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.releaseDate = moment()
          .subtract(2, `hour`)
          .format();
      });

      it(`should return the app config release date capitalized and humanized to two hours`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseDateHumanized();

        expect(result).toStrictEqual(`2 hours ago`);
      });
    });
  });

  describe(`getTotalReleaseCountHumanized()`, (): void => {
    beforeEach((): void => {
      service = AppConfigQueryService.getInstance();
      appConfigCoreService.totalReleaseCount = 8;
    });

    describe(`when the app config total release count is 0`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.totalReleaseCount = 0;
      });

      it(`should return "0 version"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`0 version`);
      });
    });

    describe(`when the app config total release count is 1`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.totalReleaseCount = 1;
      });

      it(`should return "1 version"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`1 version`);
      });
    });

    describe(`when the app config total release count is 2`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.totalReleaseCount = 2;
      });

      it(`should return "2 versions"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`2 versions`);
      });
    });

    describe(`when the app config total release count is 8`, (): void => {
      beforeEach((): void => {
        appConfigCoreService.totalReleaseCount = 8;
      });

      it(`should return "8 versions"`, (): void => {
        expect.assertions(1);

        const result = service.getTotalReleaseCountHumanized();

        expect(result).toStrictEqual(`8 versions`);
      });
    });
  });
});
