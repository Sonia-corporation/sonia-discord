import { FirebaseGuildsChannelsFeaturesService } from './firebase-guilds-channels-features.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { IFirebaseGuildChannelFeatureNoonV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-noon-v1';
import { IFirebaseGuildChannelFeatureReleaseNotesV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-release-notes-v1';
import { IFirebaseGuildChannelFeatureV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1';
import { IFirebaseGuildChannelFeatureV2 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v2';
import { IFirebaseGuildChannelFeature } from '../../../../types/guilds/channels/features/firebase-guild-channel-feature';
import { IFirebaseGuildChannelFeatureVFinal } from '../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final';
import { createMock } from 'ts-auto-mock';

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

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsFeaturesService));
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

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let feature: IFirebaseGuildChannelFeature | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesService();
    });

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toBeFalse();
      });
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toBeFalse();
      });
    });

    describe(`when the given feature is a v2 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV2>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V2,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(feature);

        expect(result).toBeTrue();
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let feature: IFirebaseGuildChannelFeature;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesService();
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(feature);

        expect(result).toBeFalse();
      });
    });

    describe(`when the given feature is a v2 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV2>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V2,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(feature);

        expect(result).toBeTrue();
      });
    });
  });

  describe(`isSet()`, (): void => {
    let feature: IFirebaseGuildChannelFeature | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesService();
    });

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(feature);

        expect(result).toBeFalse();
      });
    });

    describe(`when the given feature is a feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(feature);

        expect(result).toBeTrue();
      });
    });
  });

  describe(`create()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesService();
    });

    it(`should return a feature without noon`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.noon).toBeUndefined();
    });

    it(`should return a feature without release notes`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.releaseNotes).toBeUndefined();
    });

    it(`should return a feature on v2`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.version).toBe(2);
    });
  });

  describe(`upgrade()`, (): void => {
    let feature: IFirebaseGuildChannelFeature;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesService();
    });

    describe(`when the given feature is a v1`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return the feature upgraded to v2`, (): void => {
        expect.assertions(1);

        const result = service.upgrade(feature);

        expect(result).toStrictEqual({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          releaseNotes: undefined,
          version: FirebaseGuildChannelFeatureVersionEnum.V2,
        } as IFirebaseGuildChannelFeatureV2);
      });
    });

    describe(`when the given feature is a v2`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV2>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V2,
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
    let feature: IFirebaseGuildChannelFeature | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesService();
    });

    describe(`when the given feature is undefined`, (): void => {
      beforeEach((): void => {
        feature = undefined;
      });

      it(`should return a newly created feature`, (): void => {
        expect.assertions(3);

        const result = service.getUpToDate(feature);

        expect(result.version).toBe(2);
        expect(result.noon).toBeUndefined();
        expect(result.releaseNotes).toBeUndefined();
      });
    });

    describe(`when the given feature is a v1 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV1>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V1,
        });
      });

      it(`should return an up-to-date feature`, (): void => {
        expect.assertions(3);

        const result = service.getUpToDate(feature);

        expect(result.version).toBe(2);
        expect(result.noon).toStrictEqual({
          isEnabled: false,
          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
        } as IFirebaseGuildChannelFeatureNoonV1);
        expect(result.releaseNotes).toBeUndefined();
      });
    });

    describe(`when the given feature is a v2 feature`, (): void => {
      beforeEach((): void => {
        feature = createMock<IFirebaseGuildChannelFeatureV2>({
          noon: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
          },
          releaseNotes: {
            isEnabled: false,
            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
          },
          version: FirebaseGuildChannelFeatureVersionEnum.V2,
        });
      });

      it(`should return the given feature`, (): void => {
        expect.assertions(3);

        const result = service.getUpToDate(feature);

        expect(result.version).toBe(2);
        expect(result.noon).toStrictEqual({
          isEnabled: false,
          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
        } as IFirebaseGuildChannelFeatureNoonV1);
        expect(result.releaseNotes).toStrictEqual({
          isEnabled: false,
          version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
        } as IFirebaseGuildChannelFeatureReleaseNotesV1);
      });
    });
  });
});
