import { FirebaseGuildsService } from './firebase-guilds.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordClientService } from '../../../discord/services/discord-client.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import { FirebaseAppService } from '../firebase-app.service';
import { Guild, Snowflake } from 'discord.js';
import * as admin from 'firebase-admin';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`, (): unknown => {
  return {
    credential: {},
    firestore: jest.fn().mockReturnValue(createMock<admin.firestore.Firestore>()),
  };
});

describe(`FirebaseGuildsService`, (): void => {
  let service: FirebaseGuildsService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let firebaseAppService: FirebaseAppService;
  let discordClientService: DiscordClientService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseAppService = FirebaseAppService.getInstance();
    discordClientService = DiscordClientService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuilds service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsService));
    });

    it(`should return the created FirebaseGuilds service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsService.getInstance();

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

    it(`should notify the FirebaseGuilds service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_GUILDS_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let app: admin.app.App;

    let discordClientServiceIsReadySpy: jest.SpyInstance;
    let firebaseAppServiceGetAppSpy: jest.SpyInstance;
    let getGuildsCountSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let firestoreSpy: jest.SpyInstance;
    let notifyIsReadySpy: jest.SpyInstance;
    let settingsMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      app = createMock<admin.app.App>();
      settingsMock = jest.fn();

      discordClientServiceIsReadySpy = jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
      firebaseAppServiceGetAppSpy = jest.spyOn(firebaseAppService, `getApp`).mockReturnValue(app);
      getGuildsCountSpy = jest.spyOn(service, `getGuildsCount`).mockResolvedValue(8);
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      firestoreSpy = jest.spyOn(admin, `firestore`).mockReturnValue(
        createMock<admin.firestore.Firestore>({
          settings: settingsMock,
        })
      );
      notifyIsReadySpy = jest.spyOn(service, `notifyIsReady`).mockImplementation();
    });

    it(`should wait for the Discord app to be ready`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(discordClientServiceIsReadySpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceIsReadySpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord app failed to be ready`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockRejectedValue(new Error(`error`));
      });

      it(`should not get the Firebase app`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(firebaseAppServiceGetAppSpy).not.toHaveBeenCalled();
      });

      it(`should not create the store`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(firestoreSpy).not.toHaveBeenCalled();
      });

      it(`should not configure the store`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(settingsMock).not.toHaveBeenCalled();
      });

      it(`should not notify that the Firebase app is ready`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(notifyIsReadySpy).not.toHaveBeenCalled();
      });
    });

    describe(`once the Discord app is ready`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockResolvedValue(true);
      });

      it(`should get the Firebase app`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(firebaseAppServiceGetAppSpy).toHaveBeenCalledTimes(1);
        expect(firebaseAppServiceGetAppSpy).toHaveBeenCalledWith();
      });

      it(`should create the store`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(firestoreSpy).toHaveBeenCalledTimes(1);
        expect(firestoreSpy).toHaveBeenCalledWith(app);
      });

      it(`should configure the store`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(settingsMock).toHaveBeenCalledTimes(1);
        expect(settingsMock).toHaveBeenCalledWith({
          ignoreUndefinedProperties: true,
        });
      });

      it(`should notify that the Firebase app is ready`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(notifyIsReadySpy).toHaveBeenCalledTimes(1);
        expect(notifyIsReadySpy).toHaveBeenCalledWith();
      });

      it(`should count the guilds in the store`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(getGuildsCountSpy).toHaveBeenCalledTimes(1);
        expect(getGuildsCountSpy).toHaveBeenCalledWith();
      });

      describe(`when the count of guilds failed`, (): void => {
        beforeEach((): void => {
          getGuildsCountSpy.mockRejectedValue(new Error(`error`));
        });

        it(`should not log the count of guilds`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`error`));

          expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsService`,
            message: `text-value-8 guilds found`,
          } as ILoggerLog);
        });
      });

      describe(`when the count of guilds was successful`, (): void => {
        beforeEach((): void => {
          getGuildsCountSpy.mockResolvedValue(8);
        });

        describe(`when the count is 1`, (): void => {
          beforeEach((): void => {
            getGuildsCountSpy.mockResolvedValue(1);
          });

          it(`should log the count of guilds`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsService`,
              message: `text-value-1 guild found`,
            } as ILoggerLog);
          });
        });

        describe(`when the count is 8`, (): void => {
          beforeEach((): void => {
            getGuildsCountSpy.mockResolvedValue(8);
          });

          it(`should log the count of guilds`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsService`,
              message: `text-value-8 guilds found`,
            } as ILoggerLog);
          });
        });
      });
    });
  });

  describe(`getCollectionReference()`, (): void => {
    let firestore: admin.firestore.Firestore;
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;

    let loggerServiceWarningSpy: jest.SpyInstance;
    let collectionMock: jest.Mock<admin.firestore.CollectionReference<IFirebaseGuild>, string[]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>();
      collectionMock = jest
        .fn<admin.firestore.CollectionReference<IFirebaseGuild>, string[]>()
        .mockReturnValue(collectionReference);
      firestore = createMock<admin.firestore.Firestore>({
        collection: collectionMock,
      });

      loggerServiceWarningSpy = jest.spyOn(loggerService, `warning`).mockImplementation();
      jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
    });

    describe(`when the store is not set`, (): void => {
      it(`should not get the guilds collection from the store`, (): void => {
        expect.assertions(1);

        service.getCollectionReference();

        expect(collectionMock).not.toHaveBeenCalled();
      });

      it(`should log a warning about the store being not set`, (): void => {
        expect.assertions(2);

        service.getCollectionReference();

        expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceWarningSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsService`,
          message: `text-store not set`,
        } as ILoggerLog);
      });

      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = service.getCollectionReference();

        expect(result).toBeUndefined();
      });
    });

    describe(`when the store is set`, (): void => {
      beforeEach((): void => {
        jest.spyOn(admin, `firestore`).mockReturnValue(firestore);
      });

      it(`should get the guilds collection from the store`, async (): Promise<void> => {
        expect.assertions(2);
        await service.init();

        service.getCollectionReference();

        expect(collectionMock).toHaveBeenCalledTimes(2);
        expect(collectionMock).toHaveBeenNthCalledWith(2, `/guilds`);
      });

      it(`should not log a warning about the store being not set`, async (): Promise<void> => {
        expect.assertions(1);
        await service.init();

        service.getCollectionReference();

        expect(loggerServiceWarningSpy).not.toHaveBeenCalled();
      });

      it(`should return the guilds collection`, async (): Promise<void> => {
        expect.assertions(1);
        await service.init();

        const result = service.getCollectionReference();

        expect(result).toStrictEqual(collectionReference);
      });
    });
  });

  describe(`getGuilds()`, (): void => {
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;
    let querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>();
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
        get: (): Promise<admin.firestore.QuerySnapshot<IFirebaseGuild>> => Promise.resolve(querySnapshot),
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getGuilds()).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getGuilds()).rejects.toThrow(new Error(`Collection not available`));
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should return the guilds collection`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getGuilds();

        expect(result).toStrictEqual(querySnapshot);
      });
    });
  });

  describe(`getGuildsCount()`, (): void => {
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;
    let querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
        size: 8,
      });
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
        get: (): Promise<admin.firestore.QuerySnapshot<IFirebaseGuild>> => Promise.resolve(querySnapshot),
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getGuildsCount()).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getGuildsCount()).rejects.toThrow(new Error(`Collection not available`));
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should return the size of the guilds collection`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getGuildsCount();

        expect(result).toBe(8);
      });
    });
  });

  describe(`hasGuild()`, (): void => {
    let guildId: Snowflake;
    let documentReference: admin.firestore.DocumentReference<IFirebaseGuild>;
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;
    let documentSnapshot: admin.firestore.DocumentSnapshot<IFirebaseGuild>;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let docMock: jest.Mock<admin.firestore.DocumentReference<IFirebaseGuild>, string[]>;
    let getMock: jest.Mock<Promise<admin.firestore.DocumentSnapshot<IFirebaseGuild>>, IFirebaseGuild[]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      guildId = `dummy-guild-id`;
      documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>();
      getMock = jest
        .fn<Promise<admin.firestore.DocumentSnapshot<IFirebaseGuild>>, IFirebaseGuild[]>()
        .mockResolvedValue(documentSnapshot);
      documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
        get: getMock,
      });
      docMock = jest
        .fn<admin.firestore.DocumentReference<IFirebaseGuild>, string[]>()
        .mockReturnValue(documentReference);
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.hasGuild(guildId)).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.hasGuild(guildId)).rejects.toThrow(new Error(`Collection not available`));
      });

      it(`should not get the guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.hasGuild(guildId)).rejects.toThrow(new Error(`Collection not available`));

        expect(docMock).not.toHaveBeenCalled();
        expect(getMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should get the guild with the given guild id`, async (): Promise<void> => {
        expect.assertions(5);

        const result = await service.hasGuild(guildId);

        expect(result).toBe(false);
        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(guildId);
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith();
      });

      describe(`when the fetch of the guild failed`, (): void => {
        beforeEach((): void => {
          getMock.mockRejectedValue(new Error(`error`));
          documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(2);

          await service.hasGuild(guildId);

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsService`,
            message: `text-failed to check if Firebase has value-dummy-guild-id guild`,
          } as ILoggerLog);
        });

        it(`should return false`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.hasGuild(guildId);

          expect(result).toBe(false);
        });
      });

      describe(`when the fetch of the guild was successful`, (): void => {
        beforeEach((): void => {
          documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>();
          getMock.mockResolvedValue(documentSnapshot);
          documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when the guild does not exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>({
              exists: false,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.hasGuild(guildId);

            expect(result).toBe(false);
          });
        });

        describe(`when the guild exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>({
              exists: true,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.hasGuild(guildId);

            expect(result).toBe(true);
          });
        });
      });
    });
  });

  describe(`getGuild()`, (): void => {
    let guildId: Snowflake;
    let documentReference: admin.firestore.DocumentReference<IFirebaseGuild>;
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;
    let documentSnapshot: admin.firestore.DocumentSnapshot<IFirebaseGuild>;
    let firebaseGuild: IFirebaseGuild;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let docMock: jest.Mock<admin.firestore.DocumentReference<IFirebaseGuild>, string[]>;
    let getMock: jest.Mock<Promise<admin.firestore.DocumentSnapshot<IFirebaseGuild>>, IFirebaseGuild[]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      guildId = `dummy-guild-id`;
      documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>();
      firebaseGuild = createMock<IFirebaseGuild>();

      getMock = jest
        .fn<Promise<admin.firestore.DocumentSnapshot<IFirebaseGuild>>, IFirebaseGuild[]>()
        .mockResolvedValue(documentSnapshot);
      documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
        get: getMock,
      });
      docMock = jest
        .fn<admin.firestore.DocumentReference<IFirebaseGuild>, string[]>()
        .mockReturnValue(documentReference);
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getGuild(guildId)).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getGuild(guildId)).rejects.toThrow(new Error(`Collection not available`));
      });

      it(`should not get the guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getGuild(guildId)).rejects.toThrow(new Error(`Collection not available`));

        expect(docMock).not.toHaveBeenCalled();
        expect(getMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should get the guild with the given guild id`, async (): Promise<void> => {
        expect.assertions(5);

        const result = await service.getGuild(guildId);

        expect(result).toBeNull();
        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(guildId);
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith();
      });

      describe(`when the fetch of the guild failed`, (): void => {
        beforeEach((): void => {
          getMock.mockRejectedValue(new Error(`error`));
          documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(2);

          await service.getGuild(guildId);

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsService`,
            message: `text-failed to get the value-dummy-guild-id guild from Firebase`,
          } as ILoggerLog);
        });

        it(`should return null`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getGuild(guildId);

          expect(result).toBeNull();
        });
      });

      describe(`when the fetch of the guild was successful`, (): void => {
        beforeEach((): void => {
          documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>();
          getMock.mockResolvedValue(documentSnapshot);
          documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when the guild does not exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>({
              exists: false,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return null`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getGuild(guildId);

            expect(result).toBeNull();
          });
        });

        describe(`when the guild exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<admin.firestore.DocumentSnapshot<IFirebaseGuild>>({
              data(): IFirebaseGuild {
                return firebaseGuild;
              },
              exists: true,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuild>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return the guild`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getGuild(guildId);

            expect(result).toStrictEqual(firebaseGuild);
          });
        });
      });
    });
  });

  describe(`addGuild()`, (): void => {
    let guild: Guild;
    let documentReference: admin.firestore.DocumentReference<IFirebaseGuildVFinal>;
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuildVFinal>;
    let writeResult: admin.firestore.WriteResult;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let docMock: jest.Mock<admin.firestore.DocumentReference<IFirebaseGuildVFinal>, string[]>;
    let setMock: jest.Mock<Promise<admin.firestore.WriteResult>, [IFirebaseGuildVFinal]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      guild = createMock<Guild>({
        id: `dummy-id`,
      });
      writeResult = createMock<admin.firestore.WriteResult>();
      setMock = jest.fn<Promise<admin.firestore.WriteResult>, [IFirebaseGuildVFinal]>().mockResolvedValue(writeResult);
      documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuildVFinal>>({
        set: setMock,
      });
      docMock = jest
        .fn<admin.firestore.DocumentReference<IFirebaseGuildVFinal>, string[]>()
        .mockReturnValue(documentReference);
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuildVFinal>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceSuccessSpy = jest.spyOn(loggerService, `success`).mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.addGuild(guild)).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.addGuild(guild)).rejects.toThrow(new Error(`Collection not available`));
      });

      it(`should not add the given guild into Firebase`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.addGuild(guild)).rejects.toThrow(new Error(`Collection not available`));

        expect(docMock).not.toHaveBeenCalled();
        expect(setMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log about creating the given Firebase guild`, async (): Promise<void> => {
        expect.assertions(2);

        await service.addGuild(guild);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsService`,
          message: `text-creating Firebase guild...`,
        } as ILoggerLog);
      });

      it(`should add the given guild into Firebase`, async (): Promise<void> => {
        expect.assertions(7);

        await service.addGuild(guild);

        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(`dummy-id`);
        expect(setMock).toHaveBeenCalledTimes(1);
        expect(setMock.mock.calls[0][0].channels).toStrictEqual({});
        expect(setMock.mock.calls[0][0].id).toBe(`dummy-id`);
        expect(setMock.mock.calls[0][0].lastReleaseNotesVersion).toBe(`0.0.0`);
        expect(setMock.mock.calls[0][0].version).toStrictEqual(FirebaseGuildVersionEnum.V5);
      });

      describe(`when the guild was not successfully added into Firebase`, (): void => {
        beforeEach((): void => {
          setMock.mockRejectedValue(new Error(`error`));
          documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuildVFinal>>({
            set: setMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuildVFinal>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.addGuild(guild)).rejects.toThrow(new Error(`error`));
        });
      });

      describe(`when the guild was successfully added into Firebase`, (): void => {
        beforeEach((): void => {
          writeResult = createMock<admin.firestore.WriteResult>();
          setMock.mockResolvedValue(writeResult);
          documentReference = createMock<admin.firestore.DocumentReference<IFirebaseGuildVFinal>>({
            set: setMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuildVFinal>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should about the success of adding the guild into Firebase`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.addGuild(guild);

          expect(result).toStrictEqual(writeResult);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsService`,
            message: `text-Firebase guild value-dummy-id created`,
          } as ILoggerLog);
        });
      });
    });
  });

  describe(`isReady$()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsService();
    });

    it(`should be false by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.isReady$().pipe(take(1)).toPromise();

      expect(result).toBe(false);
    });

    describe(`when the is ready event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsReady();

        const result = await service.isReady$().pipe(take(1)).toPromise();

        expect(result).toBe(true);
      });
    });
  });

  describe(`isReady()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsService();
    });

    describe(`when the is ready event is notified`, (): void => {
      beforeEach((): void => {
        service.notifyIsReady();
      });

      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsReady();

        const result = await service.isReady();

        expect(result).toBe(true);
      });
    });
  });

  describe(`notifyIsReady()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsService();
    });

    it(`should notify that the Firebase app is ready`, async (): Promise<void> => {
      expect.assertions(1);

      service.notifyIsReady();
      const result = await service.isReady$().pipe(take(1)).toPromise();

      expect(result).toBe(true);
    });
  });

  describe(`onGuildsChange$()`, (): void => {
    let firebaseGuilds: IFirebaseGuild[];

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      firebaseGuilds = createMock<IFirebaseGuild[]>();
    });

    it(`should be an empty array by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.onGuildsChange$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual([]);
    });

    describe(`when the on guilds change event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyOnGuildsChange(firebaseGuilds);

        const result = await service.onGuildsChange$().pipe(take(1)).toPromise();

        expect(result).toStrictEqual(firebaseGuilds);
      });
    });
  });

  describe(`notifyOnGuildsChange()`, (): void => {
    let firebaseGuilds: IFirebaseGuild[];

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      firebaseGuilds = createMock<IFirebaseGuild[]>();
    });

    it(`should notify that the Firebase guilds changed`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyOnGuildsChange(firebaseGuilds);

      const result = await service.onGuildsChange$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(firebaseGuilds);
    });
  });

  describe(`getBatch()`, (): void => {
    let firestore: admin.firestore.Firestore;
    let writeBatch: admin.firestore.WriteBatch;

    let batchMock: jest.Mock<admin.firestore.WriteBatch, unknown[]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      writeBatch = createMock<admin.firestore.WriteBatch>();
      batchMock = jest.fn<admin.firestore.WriteBatch, unknown[]>().mockReturnValue(writeBatch);
      firestore = createMock<admin.firestore.Firestore>({
        batch: batchMock,
      });

      jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
    });

    describe(`when the store is not set`, (): void => {
      it(`should not get the batch from the store`, (): void => {
        expect.assertions(1);

        service.getBatch();

        expect(batchMock).not.toHaveBeenCalled();
      });

      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = service.getBatch();

        expect(result).toBeUndefined();
      });
    });

    describe(`when the store is set`, (): void => {
      beforeEach((): void => {
        jest.spyOn(admin, `firestore`).mockReturnValue(firestore);
      });

      it(`should get the batch from the store`, async (): Promise<void> => {
        expect.assertions(2);
        await service.init();

        service.getBatch();

        expect(batchMock).toHaveBeenCalledTimes(1);
        expect(batchMock).toHaveBeenCalledWith();
      });

      it(`should return the batch`, async (): Promise<void> => {
        expect.assertions(1);
        await service.init();

        const result = service.getBatch();

        expect(result).toStrictEqual(writeBatch);
      });
    });
  });

  describe(`watchGuilds()`, (): void => {
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;
    let querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>;
    let queryDocumentSnapshot: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>;
    let firebaseGuild: IFirebaseGuild;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getCollectionReferenceSpy: jest.SpyInstance;
    let notifyOnGuildsChangeSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let onSnapshotMock: jest.Mock;
    let forEachMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      firebaseGuild = createMock<IFirebaseGuild>();
      queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
        data: jest.fn().mockReturnValue(firebaseGuild),
        exists: true,
      });
      forEachMock = jest
        .fn()
        .mockImplementation(
          (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
            callback(queryDocumentSnapshot);
          }
        );
      querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
        forEach: forEachMock,
      });
      onSnapshotMock = jest
        .fn()
        .mockImplementation((onNext: (snapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>) => void): void => {
          onNext(querySnapshot);
        });
      collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
        onSnapshot: onSnapshotMock,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      notifyOnGuildsChangeSpy = jest.spyOn(service, `notifyOnGuildsChange`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getGuilds()).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should not listen for the Firebase guilds snapshot to change`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.getGuilds()).rejects.toThrow(new Error(`Collection not available`));

        expect(onSnapshotMock).not.toHaveBeenCalled();
      });

      it(`should not notify that the Firebase guilds changed`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.getGuilds()).rejects.toThrow(new Error(`Collection not available`));

        expect(notifyOnGuildsChangeSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log about watching Firebase guilds`, (): void => {
        expect.assertions(2);

        service.watchGuilds();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsService`,
          message: `text-watching Firebase guilds...`,
        } as ILoggerLog);
      });

      it(`should listen for the Firebase guilds snapshot to change`, (): void => {
        expect.assertions(1);

        service.watchGuilds();

        expect(onSnapshotMock).toHaveBeenCalledTimes(1);
      });

      describe(`when an error occurred when fetching the Firebase guilds`, (): void => {
        beforeEach((): void => {
          onSnapshotMock = jest
            .fn()
            .mockImplementation((_callback: () => void, onError: (error: Error) => void): void => {
              onError(new Error(`error`));
            });
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
            onSnapshot: onSnapshotMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log that the Firebase watcher catch an error`, (): void => {
          expect.assertions(2);

          service.watchGuilds();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
            context: `FirebaseGuildsService`,
            message: `text-Firebase guilds watcher catch an error`,
          } as ILoggerLog);
        });

        it(`should log the error`, (): void => {
          expect.assertions(2);

          service.watchGuilds();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseGuildsService`,
            message: `error-Error: error`,
          } as ILoggerLog);
        });

        it(`should not notify that the Firebase guilds changed`, (): void => {
          expect.assertions(1);

          service.watchGuilds();

          expect(notifyOnGuildsChangeSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guilds were successfully fetched`, (): void => {
        beforeEach((): void => {
          onSnapshotMock = jest
            .fn()
            .mockImplementation((onNext: (snapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>) => void): void => {
              onNext(querySnapshot);
            });
          collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
            onSnapshot: onSnapshotMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when Firebase has one valid guild`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
              data: jest.fn().mockReturnValue(firebaseGuild),
              exists: true,
            });
            forEachMock = jest
              .fn()
              .mockImplementation(
                (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                }
              );
            querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase guilds changed with one guild`, (): void => {
            expect.assertions(2);

            service.watchGuilds();

            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith([firebaseGuild] as IFirebaseGuild[]);
          });
        });

        describe(`when Firebase has one invalid guild`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
              data: jest.fn().mockReturnValue(firebaseGuild),
              exists: false,
            });
            forEachMock = jest
              .fn()
              .mockImplementation(
                (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                }
              );
            querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase guilds changed without guild`, (): void => {
            expect.assertions(2);

            service.watchGuilds();

            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith([] as IFirebaseGuild[]);
          });
        });

        describe(`when Firebase has multiple valid guild`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
              data: jest.fn().mockReturnValue(firebaseGuild),
              exists: true,
            });
            forEachMock = jest
              .fn()
              .mockImplementation(
                (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                  callback(queryDocumentSnapshot);
                  callback(queryDocumentSnapshot);
                }
              );
            querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase guilds changed with all valid guild`, (): void => {
            expect.assertions(2);

            service.watchGuilds();

            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith([
              firebaseGuild,
              firebaseGuild,
              firebaseGuild,
            ] as IFirebaseGuild[]);
          });
        });

        describe(`when Firebase has multiple invalid guild`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
              data: jest.fn().mockReturnValue(firebaseGuild),
              exists: false,
            });
            forEachMock = jest
              .fn()
              .mockImplementation(
                (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                  callback(queryDocumentSnapshot);
                  callback(queryDocumentSnapshot);
                  callback(queryDocumentSnapshot);
                }
              );
            querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase guilds changed without guild`, (): void => {
            expect.assertions(2);

            service.watchGuilds();

            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith([] as IFirebaseGuild[]);
          });
        });
      });
    });
  });
});
