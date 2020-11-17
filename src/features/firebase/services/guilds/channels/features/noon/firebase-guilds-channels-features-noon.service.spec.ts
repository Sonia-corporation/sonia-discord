import { FirebaseGuildsChannelsFeaturesNoonService } from './firebase-guilds-channels-features-noon.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { IFirebaseGuildChannelFeatureNoonV1 } from '../../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-noon-v1';
import { IFirebaseGuildChannelFeatureNoon } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon';
import { IFirebaseGuildChannelFeatureNoonVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon-v-final';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesNoonService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesNoonService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesNoon service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesNoonService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsFeaturesNoonService));
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesNoon service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesNoonService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeaturesNoon service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesNoonService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let noon: IFirebaseGuildChannelFeatureNoon | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonService();
    });

    describe(`when the given noon config is undefined`, (): void => {
      beforeEach((): void => {
        noon = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(noon);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given noon config is a v1 config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseGuildChannelFeatureNoonV1>({
          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(noon);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let noon: IFirebaseGuildChannelFeatureNoon;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonService();
    });

    describe(`when the given noon config is a v1 config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseGuildChannelFeatureNoonV1>({
          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(noon);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let noon: IFirebaseGuildChannelFeatureNoon | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonService();
    });

    describe(`when the given noon config is undefined`, (): void => {
      beforeEach((): void => {
        noon = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(noon);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given noon config is a valid config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseGuildChannelFeatureNoonVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(noon);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`create()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonService();
    });

    it(`should return a noon config with an enabled state`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.isEnabled).toBeUndefined();
    });

    it(`should return a noon config on v1`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.version).toStrictEqual(1);
    });
  });

  describe(`upgrade()`, (): void => {
    let noon: IFirebaseGuildChannelFeatureNoon;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonService();
    });

    describe(`when the given noon config is a v1`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseGuildChannelFeatureNoon>({
          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
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
    let noon: IFirebaseGuildChannelFeatureNoon | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonService();
    });

    describe(`when the given noon config is undefined`, (): void => {
      beforeEach((): void => {
        noon = undefined;
      });

      it(`should return a newly created noon config`, (): void => {
        expect.assertions(2);

        const result = service.getUpToDate(noon);

        expect(result.version).toStrictEqual(1);
        expect(result.isEnabled).toBeUndefined();
      });
    });

    describe(`when the given noon config is a v1 noon config`, (): void => {
      beforeEach((): void => {
        noon = createMock<IFirebaseGuildChannelFeatureNoon>({
          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
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
