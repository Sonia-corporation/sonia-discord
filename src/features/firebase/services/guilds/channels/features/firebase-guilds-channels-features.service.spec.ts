import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../core/services/core-event.service";
import { FirebaseGuildChannelFeatureVersionEnum } from "../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum";
import { IFirebaseGuildChannelFeatureV1 } from "../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1";
import { IFirebaseGuildChannelFeature } from "../../../../types/guilds/channels/features/firebase-guild-channel-feature";
import { IFirebaseGuildChannelFeatureVFinal } from "../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final";
import { FirebaseGuildsChannelsFeaturesService } from "./firebase-guilds-channels-features.service";

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeatures service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsChannelsFeaturesService)
      );
    });

    it(`should return the created FirebaseGuildsChannelsFeatures service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeatures service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let feature: IFirebaseGuildChannelFeature | undefined;

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV1>({
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let feature: IFirebaseGuildChannelFeature;

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV1>({
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(feature);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let feature: IFirebaseGuildChannelFeature | undefined;

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(feature);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given feature is a feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(feature);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`create()`, (): void => {
    it(`should return a feature without noon`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.noon).toBeUndefined();
    });

    it(`should return a feature on v1`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.version).toStrictEqual(1);
    });
  });

  describe(`upgrade()`, (): void => {
    let feature: IFirebaseGuildChannelFeature;

    describe(`when the given feature is a v1`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeature>({
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return the given feature`, (): void => {
        expect.assertions(1);

        const result = service.upgrade(feature);

        expect(result).toStrictEqual(feature);
      });
    });
  });
});
