import { FirebaseDmsFeaturesService } from './firebase-dms-features.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { FirebaseDmFeatureNoonVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-noon-version.enum';
import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-release-notes-version.enum';
import { FirebaseDmFeatureVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-version.enum';
import { IFirebaseDmFeatureV1 } from '../../../interfaces/dms/features/firebase-dm-feature-v1';
import { INewFirebaseDmFeature } from '../../../interfaces/dms/features/new-firebase-dm-feature';
import { IFirebaseDmFeature } from '../../../types/dms/features/firebase-dm-feature';
import { IFirebaseDmFeatureVFinal } from '../../../types/dms/features/firebase-dm-feature-v-final';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsFeaturesService`, (): void => {
  let service: FirebaseDmsFeaturesService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsFeatures service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsFeaturesService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsFeaturesService));
    });

    it(`should return the created FirebaseDmsFeatures service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsFeaturesService.getInstance();

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

    it(`should notify the FirebaseDmsFeatures service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsFeaturesService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_FEATURES_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let feature: IFirebaseDmFeature | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesService();
    });

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toBe(false);
      });
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseDmFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseDmFeatureNoonVersionEnum.V1,
          },
          version: FirebaseDmFeatureVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toBe(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let feature: IFirebaseDmFeature;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesService();
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseDmFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseDmFeatureNoonVersionEnum.V1,
          },
          version: FirebaseDmFeatureVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(feature);

        expect(result).toBe(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let feature: IFirebaseDmFeature | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesService();
    });

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(feature);

        expect(result).toBe(false);
      });
    });

    describe(`when the given feature is a feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseDmFeatureVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(feature);

        expect(result).toBe(true);
      });
    });
  });

  describe(`create()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseDmsFeaturesService();
    });

    it(`should return a new feature config`, (): void => {
      expect.assertions(1);

      const result = service.create();

      const newFirebaseDmFeature: INewFirebaseDmFeature = {
        version: FirebaseDmFeatureVersionEnum.V1,
      };
      expect(result).toStrictEqual(newFirebaseDmFeature);
    });
  });

  describe(`upgrade()`, (): void => {
    let feature: IFirebaseDmFeature;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesService();
    });

    describe(`when the given feature is a v1`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseDmFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseDmFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseDmFeatureVersionEnum.V1,
        });
      });

      it(`should return the given feature`, (): void => {
        expect.assertions(1);

        const result = service.upgrade(feature);

        expect(result).toStrictEqual(feature);
      });
    });
  });

  describe(`getUpToDate()`, (): void => {
    let feature: IFirebaseDmFeature | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesService();
    });

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return a newly created feature`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(feature);

        const newFirebaseDmFeature: INewFirebaseDmFeature = {
          version: FirebaseDmFeatureVersionEnum.V1,
        };
        expect(result).toStrictEqual(newFirebaseDmFeature);
      });
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseDmFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseDmFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseDmFeatureVersionEnum.V1,
        });
      });

      it(`should return the given feature`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(feature);

        const firebaseDmFeatureFinal: IFirebaseDmFeatureVFinal = {
          noon: {
            isEnabled: false,
            version: FirebaseDmFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseDmFeatureVersionEnum.V1,
        };
        expect(result).toStrictEqual(firebaseDmFeatureFinal);
      });
    });
  });
});
