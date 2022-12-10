import { FirebaseDmsFeaturesReleaseNotesService } from './firebase-dms-features-release-notes.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../../../enums/dms/features/firebase-dm-feature-release-notes-version.enum';
import { IFirebaseDmFeatureReleaseNotesV1 } from '../../../../interfaces/dms/features/firebase-dm-feature-release-notes-v1';
import { IFirebaseDmFeatureReleaseNotes } from '../../../../types/dms/features/firebase-dm-feature-release-notes';
import { IFirebaseDmFeatureReleaseNotesVFinal } from '../../../../types/dms/features/firebase-dm-feature-release-notes-v-final';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsFeaturesReleaseNotesService`, (): void => {
  let service: FirebaseDmsFeaturesReleaseNotesService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsFeaturesReleaseNotes service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsFeaturesReleaseNotesService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsFeaturesReleaseNotesService));
    });

    it(`should return the created FirebaseDmsFeaturesReleaseNotes service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsFeaturesReleaseNotesService.getInstance();

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

    it(`should notify the FirebaseDmsFeaturesReleaseNotes service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsFeaturesReleaseNotesService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_FEATURES_RELEASE_NOTES_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let releaseNotes: IFirebaseDmFeatureReleaseNotes | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is undefined`, (): void => {
      beforeEach((): void => {
        releaseNotes = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(releaseNotes);

        expect(result).toBe(false);
      });
    });

    describe(`when the given release notes config is a v1 config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createMock<IFirebaseDmFeatureReleaseNotesV1>({
          version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(releaseNotes);

        expect(result).toBe(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let releaseNotes: IFirebaseDmFeatureReleaseNotes;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is a v1 config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createMock<IFirebaseDmFeatureReleaseNotesV1>({
          version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(releaseNotes);

        expect(result).toBe(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let releaseNotes: IFirebaseDmFeatureReleaseNotes | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is undefined`, (): void => {
      beforeEach((): void => {
        releaseNotes = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(releaseNotes);

        expect(result).toBe(false);
      });
    });

    describe(`when the given release notes config is a valid config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createMock<IFirebaseDmFeatureReleaseNotesVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(releaseNotes);

        expect(result).toBe(true);
      });
    });
  });

  describe(`create()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesService();
    });

    it(`should return a release notes config with an enabled state`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.isEnabled).toBeUndefined();
    });

    it(`should return a release notes config on v1`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.version).toBe(1);
    });
  });

  describe(`upgrade()`, (): void => {
    let releaseNotes: IFirebaseDmFeatureReleaseNotes;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is a v1`, (): void => {
      beforeEach((): void => {
        releaseNotes = createMock<IFirebaseDmFeatureReleaseNotes>({
          version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
        });
      });

      it(`should return the given release notes config`, (): void => {
        expect.assertions(1);

        const result = service.upgrade(releaseNotes);

        expect(result).toStrictEqual(releaseNotes);
      });
    });
  });

  describe(`getUpToDate()`, (): void => {
    let releaseNotes: IFirebaseDmFeatureReleaseNotes | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is undefined`, (): void => {
      beforeEach((): void => {
        releaseNotes = undefined;
      });

      it(`should return a newly created release notes config`, (): void => {
        expect.assertions(2);

        const result = service.getUpToDate(releaseNotes);

        expect(result.version).toBe(1);
        expect(result.isEnabled).toBeUndefined();
      });
    });

    describe(`when the given release notes config is a v1 release notes config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createMock<IFirebaseDmFeatureReleaseNotes>({
          version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
        });
      });

      it(`should return the given release notes config`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(releaseNotes);

        expect(result).toStrictEqual(releaseNotes);
      });
    });
  });
});
