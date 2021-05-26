import { FirebaseGuildsChannelsFeaturesReleaseNotesService } from './firebase-guilds-channels-features-release-notes.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';
import { IFirebaseGuildChannelFeatureReleaseNotesV1 } from '../../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-release-notes-v1';
import { IFirebaseGuildChannelFeatureReleaseNotesVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-release-notes-v-final';
import { IFirebaseGuildChannelFeatureReleaseNotes } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-release-notes';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesReleaseNotesService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesReleaseNotesService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesReleaseNotes service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesReleaseNotesService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsFeaturesReleaseNotesService));
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesReleaseNotes service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesReleaseNotesService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeaturesReleaseNotes service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_SERVICE
      );
    });
  });

  describe(`isValid()`, (): void => {
    let releaseNotes: IFirebaseGuildChannelFeatureReleaseNotes | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is undefined`, (): void => {
      beforeEach((): void => {
        releaseNotes = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isValid(releaseNotes);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given release notes config is a v1 config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotesV1>({
          version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isValid(releaseNotes);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isUpToDate()`, (): void => {
    let releaseNotes: IFirebaseGuildChannelFeatureReleaseNotes;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is a v1 config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotesV1>({
          version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isUpToDate(releaseNotes);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`isSet()`, (): void => {
    let releaseNotes: IFirebaseGuildChannelFeatureReleaseNotes | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is undefined`, (): void => {
      beforeEach((): void => {
        releaseNotes = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isSet(releaseNotes);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given release notes config is a valid config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotesVFinal>();
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSet(releaseNotes);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`create()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    });

    it(`should return a release notes config with an enabled state`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.isEnabled).toBeUndefined();
    });

    it(`should return a release notes config on v1`, (): void => {
      expect.assertions(1);

      const result = service.create();

      expect(result.version).toStrictEqual(1);
    });
  });

  describe(`upgrade()`, (): void => {
    let releaseNotes: IFirebaseGuildChannelFeatureReleaseNotes;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is a v1`, (): void => {
      beforeEach((): void => {
        releaseNotes = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotes>({
          version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
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
    let releaseNotes: IFirebaseGuildChannelFeatureReleaseNotes | undefined;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    });

    describe(`when the given release notes config is undefined`, (): void => {
      beforeEach((): void => {
        releaseNotes = undefined;
      });

      it(`should return a newly created release notes config`, (): void => {
        expect.assertions(2);

        const result = service.getUpToDate(releaseNotes);

        expect(result.version).toStrictEqual(1);
        expect(result.isEnabled).toBeUndefined();
      });
    });

    describe(`when the given release notes config is a v1 release notes config`, (): void => {
      beforeEach((): void => {
        releaseNotes = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotes>({
          version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
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
