import { ReleaseTypeService } from './release-type.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { AppConfigReleaseTypeEnum } from '../enums/app-config-release-type.enum';

describe(`ReleaseTypeService`, (): void => {
  let service: ReleaseTypeService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a ReleaseTypeService service`, (): void => {
      expect.assertions(1);

      service = ReleaseTypeService.getInstance();

      expect(service).toStrictEqual(expect.any(ReleaseTypeService));
    });

    it(`should return the created ReleaseTypeService service`, (): void => {
      expect.assertions(1);

      const result = ReleaseTypeService.getInstance();

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

    it(`should notify the ReleaseTypeService service creation`, (): void => {
      expect.assertions(2);

      service = new ReleaseTypeService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.APP_CONFIG_QUERY_SERVICE);
    });
  });

  describe(`getReleaseType()`, (): void => {
    let releaseNotes: string;

    beforeEach((): void => {
      service = new ReleaseTypeService();
    });

    describe(`when the given release note is empty`, (): void => {
      beforeEach((): void => {
        releaseNotes = ``;
      });

      it(`should return unknown`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.UNKNOWN);
      });
    });

    describe(`when the given release note does not contain any valid block`, (): void => {
      beforeEach((): void => {
        releaseNotes = ``;
      });

      it(`should return unknown`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.UNKNOWN);
      });
    });

    describe(`when the given release note contains a bug fixes block with one fix`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Bug Fixes:__\nlabeler:** fix build error`;
      });

      it(`should return bug fixes`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.BUG_FIXES);
      });
    });

    describe(`when the given release note contains a bug fixes block with two fix`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should return bug fixes`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.BUG_FIXES);
      });
    });

    describe(`when the given release note contains a features block with one feature`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Features:__\nlabeler:** fix build error`;
      });

      it(`should return features`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.FEATURES);
      });
    });

    describe(`when the given release note contains a features block with two features`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Features:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should return bug features`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.FEATURES);
      });
    });

    describe(`when the given release note contains a performance improvements block with one performance improvement`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Performance Improvements:__\nlabeler:** fix build error`;
      });

      it(`should return performance improvements`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS);
      });
    });

    describe(`when the given release note contains a performance improvements block with two performance improvements`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Performance Improvements:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should return performance improvements`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.PERFORMANCE_IMPROVEMENTS);
      });
    });

    describe(`when the given release note contains a performance improvements block and a bug fixes block`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Performance Improvements:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Bug Fixes:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token`;
      });

      it(`should return mixed`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.MIXED);
      });
    });

    describe(`when the given release note contains a performance improvements block, a bug fixes block and a features block`, (): void => {
      beforeEach((): void => {
        releaseNotes = `**__Performance Improvements:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing\n**__Bug Fixes:__\ncommand-version:** add a footer\n**app-total-release-count:** add axios xhr call to get the total tags from the github api\n**logs:** add more logs for the messages\n**github:** add new github config service\n**command-version:** add the real number of release in the footer\n**init-service:** used the github config service to get the personal access token\n**__Features:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
      });

      it(`should return mixed`, (): void => {
        expect.assertions(1);

        const result = service.getReleaseType(releaseNotes);

        expect(result).toStrictEqual(AppConfigReleaseTypeEnum.MIXED);
      });
    });
  });
});
