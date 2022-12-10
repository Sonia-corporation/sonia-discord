import { FirebaseDmsFeaturesNoonService } from './firebase-dms-features-noon.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { FirebaseDmFeatureNoonVersionEnum } from '../../../../enums/dms/features/firebase-dm-feature-noon-version.enum';
import { IFirebaseDmFeatureNoonV1 } from '../../../../interfaces/dms/features/firebase-dm-feature-noon-v1';
import { IFirebaseDmFeatureNoon } from '../../../../types/dms/features/firebase-dm-feature-noon';
import { IFirebaseDmFeatureNoonVFinal } from '../../../../types/dms/features/firebase-dm-feature-noon-v-final';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsFeaturesNoonService`, (): void => {
  let service: FirebaseDmsFeaturesNoonService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsFeaturesNoon service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsFeaturesNoonService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsFeaturesNoonService));
    });

    it(`should return the created FirebaseDmsFeaturesNoon service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsFeaturesNoonService.getInstance();

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

    it(`should notify the FirebaseDmsFeaturesNoon service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsFeaturesNoonService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_FEATURES_NOON_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let noon: IFirebaseDmFeatureNoon | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesNoonService();
    });

    describe(`when the given noon config is undefined`, (): void => {
      beforeEach((): void => {
        noon = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(noon);

        expect(result).toBe(false);
      });
    });

    describe(`when the given noon config is a v1 config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseDmFeatureNoonV1>({
          version: FirebaseDmFeatureNoonVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(noon);

        expect(result).toBe(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let noon: IFirebaseDmFeatureNoon;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesNoonService();
    });

    describe(`when the given noon config is a v1 config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseDmFeatureNoonV1>({
          version: FirebaseDmFeatureNoonVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(noon);

        expect(result).toBe(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let noon: IFirebaseDmFeatureNoon | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesNoonService();
    });

    describe(`when the given noon config is undefined`, (): void => {
      beforeEach((): void => {
        noon = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(noon);

        expect(result).toBe(false);
      });
    });

    describe(`when the given noon config is a valid config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseDmFeatureNoonVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(noon);

        expect(result).toBe(true);
      });
    });
  });

  describe(`create()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseDmsFeaturesNoonService();
    });

    it(`should return a noon config with an enabled state`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.isEnabled).toBeUndefined();
    });

    it(`should return a noon config on v1`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.version).toBe(1);
    });
  });

  describe(`upgrade()`, (): void => {
    let noon: IFirebaseDmFeatureNoon;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesNoonService();
    });

    describe(`when the given noon config is a v1`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseDmFeatureNoon>({
          version: FirebaseDmFeatureNoonVersionEnum.V1,
        });
      });

      it(`should return the given noon config`, (): void => {
        expect.assertions(1);

        const result = service.upgrade(noon);

        expect(result).toStrictEqual(noon);
      });
    });
  });

  describe(`getUpToDate()`, (): void => {
    let noon: IFirebaseDmFeatureNoon | undefined;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesNoonService();
    });

    describe(`when the given noon config is undefined`, (): void => {
      beforeEach((): void => {
        noon = undefined;
      });

      it(`should return a newly created noon config`, (): void => {
        expect.assertions(2);

        const result = service.getUpToDate(noon);

        expect(result.version).toBe(1);
        expect(result.isEnabled).toBeUndefined();
      });
    });

    describe(`when the given noon config is a v1 noon config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseDmFeatureNoon>({
          version: FirebaseDmFeatureNoonVersionEnum.V1,
        });
      });

      it(`should return the given noon config`, (): void => {
        expect.assertions(1);

        const result = service.getUpToDate(noon);

        expect(result).toStrictEqual(noon);
      });
    });
  });
});
