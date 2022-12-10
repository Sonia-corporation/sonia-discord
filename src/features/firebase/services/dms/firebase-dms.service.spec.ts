import { FirebaseDmsService } from './firebase-dms.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordClientService } from '../../../discord/services/discord-client.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { FirebaseDmFeatureVersionEnum } from '../../enums/dms/features/firebase-dm-feature-version.enum';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';
import { FirebaseStoreService } from '../firebase-store.service';
import { Snowflake } from 'discord.js';
import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteBatch,
  WriteResult,
} from 'firebase-admin/firestore';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsService`, (): void => {
  let service: FirebaseDmsService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordClientService: DiscordClientService;
  let firebaseStoreService: FirebaseStoreService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    firebaseStoreService = FirebaseStoreService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDms service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsService));
    });

    it(`should return the created FirebaseDms service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsService.getInstance();

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

    it(`should notify the FirebaseDms service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_DMS_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let getDmsCountSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsService();

      getDmsCountSpy = jest.spyOn(service, `getDmsCount`).mockResolvedValue(8);
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    it(`should count the DMs in the store`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(getDmsCountSpy).toHaveBeenCalledTimes(1);
      expect(getDmsCountSpy).toHaveBeenCalledWith();
    });

    describe(`when the count of DMs failed`, (): void => {
      beforeEach((): void => {
        getDmsCountSpy.mockRejectedValue(new Error(`error`));
      });

      it(`should not log the count of DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`error`));

        expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
          context: `FirebaseDmsService`,
          message: `text-value-8 DMs found`,
        } as ILoggerLog);
      });
    });

    describe(`when the count of DMs was successful`, (): void => {
      beforeEach((): void => {
        getDmsCountSpy.mockResolvedValue(8);
      });

      describe(`when the count is 1`, (): void => {
        beforeEach((): void => {
          getDmsCountSpy.mockResolvedValue(1);
        });

        it(`should log the count of DMs`, async (): Promise<void> => {
          expect.assertions(2);

          await service.init();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsService`,
            message: `text-value-1 DM found`,
          } as ILoggerLog);
        });
      });

      describe(`when the count is 8`, (): void => {
        beforeEach((): void => {
          getDmsCountSpy.mockResolvedValue(8);
        });

        it(`should log the count of DMs`, async (): Promise<void> => {
          expect.assertions(2);

          await service.init();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsService`,
            message: `text-value-8 DMs found`,
          } as ILoggerLog);
        });
      });
    });
  });

  describe(`getCollectionReference()`, (): void => {
    let firestore: Firestore;
    let collectionReference: CollectionReference<IFirebaseDm>;

    let loggerServiceWarningSpy: jest.SpyInstance;
    let collectionMock: jest.Mock<CollectionReference<IFirebaseDm>, string[]>;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      collectionReference = createMock<CollectionReference<IFirebaseDm>>();
      collectionMock = jest.fn<CollectionReference<IFirebaseDm>, string[]>().mockReturnValue(collectionReference);
      firestore = createMock<Firestore>({
        collection: collectionMock,
      });

      loggerServiceWarningSpy = jest.spyOn(loggerService, `warning`).mockImplementation();
      jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
    });

    describe(`when the store is not set`, (): void => {
      it(`should not get the DMs collection from the store`, (): void => {
        expect.assertions(1);

        service.getCollectionReference();

        expect(collectionMock).not.toHaveBeenCalled();
      });

      it(`should log a warning about the store being not set`, (): void => {
        expect.assertions(2);

        service.getCollectionReference();

        expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceWarningSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsService`,
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
        jest.spyOn(firebaseStoreService, `getStore`).mockReturnValue(firestore);
      });

      it(`should get the DMs collection from the store`, async (): Promise<void> => {
        expect.assertions(2);
        await service.init();

        service.getCollectionReference();

        expect(collectionMock).toHaveBeenCalledTimes(2);
        expect(collectionMock).toHaveBeenNthCalledWith(2, `dms`);
      });

      it(`should not log a warning about the store being not set`, async (): Promise<void> => {
        expect.assertions(1);
        await service.init();

        service.getCollectionReference();

        expect(loggerServiceWarningSpy).not.toHaveBeenCalled();
      });

      it(`should return the DMs collection`, async (): Promise<void> => {
        expect.assertions(1);
        await service.init();

        const result = service.getCollectionReference();

        expect(result).toStrictEqual(collectionReference);
      });
    });
  });

  describe(`getDms()`, (): void => {
    let collectionReference: CollectionReference<IFirebaseDm>;
    let querySnapshot: QuerySnapshot<IFirebaseDm>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>();
      collectionReference = createMock<CollectionReference<IFirebaseDm>>({
        get: (): Promise<QuerySnapshot<IFirebaseDm>> => Promise.resolve(querySnapshot),
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
    });

    it(`should get the DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getDms()).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getDms()).rejects.toThrow(new Error(`Collection not available`));
      });
    });

    describe(`when the DMs collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should return the DMs collection`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getDms();

        expect(result).toStrictEqual(querySnapshot);
      });
    });
  });

  describe(`getDmsCount()`, (): void => {
    let collectionReference: CollectionReference<IFirebaseDm>;
    let querySnapshot: QuerySnapshot<IFirebaseDm>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
        size: 8,
      });
      collectionReference = createMock<CollectionReference<IFirebaseDm>>({
        get: (): Promise<QuerySnapshot<IFirebaseDm>> => Promise.resolve(querySnapshot),
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
    });

    it(`should get the DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getDmsCount()).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getDmsCount()).rejects.toThrow(new Error(`Collection not available`));
      });
    });

    describe(`when the DMs collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should return the size of the DMs collection`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getDmsCount();

        expect(result).toBe(8);
      });
    });
  });

  describe(`hasDm()`, (): void => {
    let userId: Snowflake;
    let documentReference: DocumentReference<IFirebaseDm>;
    let collectionReference: CollectionReference<IFirebaseDm>;
    let documentSnapshot: DocumentSnapshot<IFirebaseDm>;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let docMock: jest.Mock<DocumentReference<IFirebaseDm>, string[]>;
    let getMock: jest.Mock<Promise<DocumentSnapshot<IFirebaseDm>>, IFirebaseDm[]>;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      userId = `dummy-user-id`;
      documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>();
      getMock = jest.fn<Promise<DocumentSnapshot<IFirebaseDm>>, IFirebaseDm[]>().mockResolvedValue(documentSnapshot);
      documentReference = createMock<DocumentReference<IFirebaseDm>>({
        get: getMock,
      });
      docMock = jest.fn<DocumentReference<IFirebaseDm>, string[]>().mockReturnValue(documentReference);
      collectionReference = createMock<CollectionReference<IFirebaseDm>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should get the DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.hasDm(userId)).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.hasDm(userId)).rejects.toThrow(new Error(`Collection not available`));
      });

      it(`should not get the DM`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.hasDm(userId)).rejects.toThrow(new Error(`Collection not available`));

        expect(docMock).not.toHaveBeenCalled();
        expect(getMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the DMs collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should get the DM with the given user ID`, async (): Promise<void> => {
        expect.assertions(5);

        const result = await service.hasDm(userId);

        expect(result).toBe(false);
        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(userId);
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith();
      });

      describe(`when the fetch of the DM failed`, (): void => {
        beforeEach((): void => {
          getMock.mockRejectedValue(new Error(`error`));
          documentReference = createMock<DocumentReference<IFirebaseDm>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseDm>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(2);

          await service.hasDm(userId);

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsService`,
            message: `text-failed to check if Firebase has DM value-dummy-user-id`,
          } as ILoggerLog);
        });

        it(`should return false`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.hasDm(userId);

          expect(result).toBe(false);
        });
      });

      describe(`when the fetch of the DM was successful`, (): void => {
        beforeEach((): void => {
          documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>();
          getMock.mockResolvedValue(documentSnapshot);
          documentReference = createMock<DocumentReference<IFirebaseDm>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseDm>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when the DM does not exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>({
              exists: false,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<DocumentReference<IFirebaseDm>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.hasDm(userId);

            expect(result).toBe(false);
          });
        });

        describe(`when the DM exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>({
              exists: true,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<DocumentReference<IFirebaseDm>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.hasDm(userId);

            expect(result).toBe(true);
          });
        });
      });
    });
  });

  describe(`getDm()`, (): void => {
    let userId: Snowflake;
    let documentReference: DocumentReference<IFirebaseDm>;
    let collectionReference: CollectionReference<IFirebaseDm>;
    let documentSnapshot: DocumentSnapshot<IFirebaseDm>;
    let firebaseDm: IFirebaseDm;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let docMock: jest.Mock<DocumentReference<IFirebaseDm>, string[]>;
    let getMock: jest.Mock<Promise<DocumentSnapshot<IFirebaseDm>>, IFirebaseDm[]>;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      userId = `dummy-user-id`;
      documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>();
      firebaseDm = createMock<IFirebaseDm>();

      getMock = jest.fn<Promise<DocumentSnapshot<IFirebaseDm>>, IFirebaseDm[]>().mockResolvedValue(documentSnapshot);
      documentReference = createMock<DocumentReference<IFirebaseDm>>({
        get: getMock,
      });
      docMock = jest.fn<DocumentReference<IFirebaseDm>, string[]>().mockReturnValue(documentReference);
      collectionReference = createMock<CollectionReference<IFirebaseDm>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should get the DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getDm(userId)).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getDm(userId)).rejects.toThrow(new Error(`Collection not available`));
      });

      it(`should not get the DM`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getDm(userId)).rejects.toThrow(new Error(`Collection not available`));

        expect(docMock).not.toHaveBeenCalled();
        expect(getMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the DMs collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should get the DM with the given user ID`, async (): Promise<void> => {
        expect.assertions(5);

        const result = await service.getDm(userId);

        expect(result).toBeNull();
        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(userId);
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith();
      });

      describe(`when the fetch of the DM failed`, (): void => {
        beforeEach((): void => {
          getMock.mockRejectedValue(new Error(`error`));
          documentReference = createMock<DocumentReference<IFirebaseDm>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseDm>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(2);

          await service.getDm(userId);

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsService`,
            message: `text-failed to get the DM value-dummy-user-id from Firebase`,
          } as ILoggerLog);
        });

        it(`should return null`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getDm(userId);

          expect(result).toBeNull();
        });
      });

      describe(`when the fetch of the DM was successful`, (): void => {
        beforeEach((): void => {
          documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>();
          getMock.mockResolvedValue(documentSnapshot);
          documentReference = createMock<DocumentReference<IFirebaseDm>>({
            get: getMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseDm>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when the DM does not exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>({
              exists: false,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<DocumentReference<IFirebaseDm>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return null`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getDm(userId);

            expect(result).toBeNull();
          });
        });

        describe(`when the DM exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<DocumentSnapshot<IFirebaseDm>>({
              data(): IFirebaseDm {
                return firebaseDm;
              },
              exists: true,
            });
            getMock.mockResolvedValue(documentSnapshot);
            documentReference = createMock<DocumentReference<IFirebaseDm>>({
              get: getMock,
            });
            docMock.mockReturnValue(documentReference);
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return the DM`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getDm(userId);

            expect(result).toStrictEqual(firebaseDm);
          });
        });
      });
    });
  });

  describe(`addDm()`, (): void => {
    let userId: Snowflake;
    let documentReference: DocumentReference<IFirebaseDmVFinal>;
    let collectionReference: CollectionReference<IFirebaseDmVFinal>;
    let writeResult: WriteResult;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let docMock: jest.Mock<DocumentReference<IFirebaseDmVFinal>, string[]>;
    let setMock: jest.Mock<Promise<WriteResult>, [IFirebaseDmVFinal]>;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      userId = `dummy-user-id`;
      writeResult = createMock<WriteResult>();
      setMock = jest.fn<Promise<WriteResult>, [IFirebaseDmVFinal]>().mockResolvedValue(writeResult);
      documentReference = createMock<DocumentReference<IFirebaseDmVFinal>>({
        set: setMock,
      });
      docMock = jest.fn<DocumentReference<IFirebaseDmVFinal>, string[]>().mockReturnValue(documentReference);
      collectionReference = createMock<CollectionReference<IFirebaseDmVFinal>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceSuccessSpy = jest.spyOn(loggerService, `success`).mockImplementation();
    });

    it(`should get the DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.addDm(userId)).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.addDm(userId)).rejects.toThrow(new Error(`Collection not available`));
      });

      it(`should not add the given user into Firebase`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.addDm(userId)).rejects.toThrow(new Error(`Collection not available`));

        expect(docMock).not.toHaveBeenCalled();
        expect(setMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the DMs collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log about creating the given Firebase DM`, async (): Promise<void> => {
        expect.assertions(2);

        await service.addDm(userId);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsService`,
          message: `text-creating Firebase DM...`,
        } as ILoggerLog);
      });

      it(`should add the given DM into Firebase`, async (): Promise<void> => {
        expect.assertions(7);

        await service.addDm(userId);

        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(`dummy-user-id`);
        expect(setMock).toHaveBeenCalledTimes(1);
        expect(setMock.mock.calls[0][0].features).toStrictEqual({
          version: FirebaseDmFeatureVersionEnum.V1,
        });
        expect(setMock.mock.calls[0][0].id).toBe(`dummy-user-id`);
        expect(setMock.mock.calls[0][0].lastReleaseNotesVersion).toBe(`0.0.0`);
        expect(setMock.mock.calls[0][0].version).toStrictEqual(FirebaseDmVersionEnum.V1);
      });

      describe(`when the DM was not successfully added into Firebase`, (): void => {
        beforeEach((): void => {
          setMock.mockRejectedValue(new Error(`error`));
          documentReference = createMock<DocumentReference<IFirebaseDmVFinal>>({
            set: setMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseDmVFinal>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.addDm(userId)).rejects.toThrow(new Error(`error`));
        });
      });

      describe(`when the DM was successfully added into Firebase`, (): void => {
        beforeEach((): void => {
          writeResult = createMock<WriteResult>();
          setMock.mockResolvedValue(writeResult);
          documentReference = createMock<DocumentReference<IFirebaseDmVFinal>>({
            set: setMock,
          });
          docMock.mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseDmVFinal>>({
            doc: docMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should about the success of adding the DM into Firebase`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await service.addDm(userId);

          expect(result).toStrictEqual(writeResult);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsService`,
            message: `text-Firebase DM value-dummy-user-id created`,
          } as ILoggerLog);
        });
      });
    });
  });

  describe(`onDmsChange$()`, (): void => {
    let firebaseDms: IFirebaseDm[];

    beforeEach((): void => {
      service = new FirebaseDmsService();
      firebaseDms = createMock<IFirebaseDm[]>();
    });

    it(`should be an empty array by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await firstValueFrom(service.onDmsChange$().pipe(take(1)));

      expect(result).toStrictEqual([]);
    });

    describe(`when the on DMs change event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyOnDmsChange(firebaseDms);

        const result = await firstValueFrom(service.onDmsChange$().pipe(take(1)));

        expect(result).toStrictEqual(firebaseDms);
      });
    });
  });

  describe(`notifyOnDmsChange()`, (): void => {
    let firebaseDms: IFirebaseDm[];

    beforeEach((): void => {
      service = new FirebaseDmsService();
      firebaseDms = createMock<IFirebaseDm[]>();
    });

    it(`should notify that the Firebase DMs changed`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyOnDmsChange(firebaseDms);

      const result = await firstValueFrom(service.onDmsChange$().pipe(take(1)));

      expect(result).toStrictEqual(firebaseDms);
    });
  });

  describe(`getBatch()`, (): void => {
    let firestore: Firestore;
    let writeBatch: WriteBatch;

    let batchMock: jest.Mock<WriteBatch, unknown[]>;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      writeBatch = createMock<WriteBatch>();
      batchMock = jest.fn<WriteBatch, unknown[]>().mockReturnValue(writeBatch);
      firestore = createMock<Firestore>({
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
        jest.spyOn(firebaseStoreService, `getStore`).mockReturnValue(firestore);
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

  describe(`watchDms()`, (): void => {
    let collectionReference: CollectionReference<IFirebaseDm>;
    let querySnapshot: QuerySnapshot<IFirebaseDm>;
    let queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseDm>;
    let firebaseDm: IFirebaseDm;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getCollectionReferenceSpy: jest.SpyInstance;
    let notifyOnDmsChangeSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let onSnapshotMock: jest.Mock;
    let forEachMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseDmsService();
      firebaseDm = createMock<IFirebaseDm>();
      queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
        data: jest.fn().mockReturnValue(firebaseDm),
        exists: true,
      });
      forEachMock = jest
        .fn()
        .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
          callback(queryDocumentSnapshot);
        });
      querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
        forEach: forEachMock,
      });
      onSnapshotMock = jest.fn().mockImplementation((onNext: (snapshot: QuerySnapshot<IFirebaseDm>) => void): void => {
        onNext(querySnapshot);
      });
      collectionReference = createMock<CollectionReference<IFirebaseDm>>({
        onSnapshot: onSnapshotMock,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getCollectionReferenceSpy = jest.spyOn(service, `getCollectionReference`).mockImplementation();
      notifyOnDmsChangeSpy = jest.spyOn(service, `notifyOnDmsChange`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should get the DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getDms()).rejects.toThrow(new Error(`Collection not available`));

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should not listen for the Firebase DMs snapshot to change`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.getDms()).rejects.toThrow(new Error(`Collection not available`));

        expect(onSnapshotMock).not.toHaveBeenCalled();
      });

      it(`should not notify that the Firebase DMs changed`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.getDms()).rejects.toThrow(new Error(`Collection not available`));

        expect(notifyOnDmsChangeSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the DMs collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log about watching Firebase DMs`, (): void => {
        expect.assertions(2);

        service.watchDms();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsService`,
          message: `text-watching Firebase DMs...`,
        } as ILoggerLog);
      });

      it(`should listen for the Firebase DMs snapshot to change`, (): void => {
        expect.assertions(1);

        service.watchDms();

        expect(onSnapshotMock).toHaveBeenCalledTimes(1);
      });

      describe(`when an error occurred when fetching the Firebase DMs`, (): void => {
        beforeEach((): void => {
          onSnapshotMock = jest
            .fn()
            .mockImplementation((_callback: () => void, onError: (error: Error) => void): void => {
              onError(new Error(`error`));
            });
          collectionReference = createMock<CollectionReference<IFirebaseDm>>({
            onSnapshot: onSnapshotMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log that the Firebase watcher catch an error`, (): void => {
          expect.assertions(2);

          service.watchDms();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
            context: `FirebaseDmsService`,
            message: `text-Firebase DMs watcher catch an error`,
          } as ILoggerLog);
        });

        it(`should log the error`, (): void => {
          expect.assertions(2);

          service.watchDms();

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseDmsService`,
            message: `error-Error: error`,
          } as ILoggerLog);
        });

        it(`should not notify that the Firebase DMs changed`, (): void => {
          expect.assertions(1);

          service.watchDms();

          expect(notifyOnDmsChangeSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase DMs were successfully fetched`, (): void => {
        beforeEach((): void => {
          onSnapshotMock = jest
            .fn()
            .mockImplementation((onNext: (snapshot: QuerySnapshot<IFirebaseDm>) => void): void => {
              onNext(querySnapshot);
            });
          collectionReference = createMock<CollectionReference<IFirebaseDm>>({
            onSnapshot: onSnapshotMock,
          });

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when Firebase has one valid DM`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
              data: jest.fn().mockReturnValue(firebaseDm),
              exists: true,
            });
            forEachMock = jest
              .fn()
              .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                callback(queryDocumentSnapshot);
              });
            querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: QuerySnapshot<IFirebaseDm>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase DMs changed with one DM`, (): void => {
            expect.assertions(2);

            service.watchDms();

            expect(notifyOnDmsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnDmsChangeSpy).toHaveBeenCalledWith([firebaseDm] as IFirebaseDm[]);
          });
        });

        describe(`when Firebase has one invalid DM`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
              data: jest.fn().mockReturnValue(firebaseDm),
              exists: false,
            });
            forEachMock = jest
              .fn()
              .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                callback(queryDocumentSnapshot);
              });
            querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: QuerySnapshot<IFirebaseDm>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase DMs changed without DM`, (): void => {
            expect.assertions(2);

            service.watchDms();

            expect(notifyOnDmsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnDmsChangeSpy).toHaveBeenCalledWith([] as IFirebaseDm[]);
          });
        });

        describe(`when Firebase has multiple valid DM`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
              data: jest.fn().mockReturnValue(firebaseDm),
              exists: true,
            });
            forEachMock = jest
              .fn()
              .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                callback(queryDocumentSnapshot);
                callback(queryDocumentSnapshot);
                callback(queryDocumentSnapshot);
              });
            querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: QuerySnapshot<IFirebaseDm>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase DMs changed with all valid DM`, (): void => {
            expect.assertions(2);

            service.watchDms();

            expect(notifyOnDmsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnDmsChangeSpy).toHaveBeenCalledWith([firebaseDm, firebaseDm, firebaseDm] as IFirebaseDm[]);
          });
        });

        describe(`when Firebase has multiple invalid DM`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
              data: jest.fn().mockReturnValue(firebaseDm),
              exists: false,
            });
            forEachMock = jest
              .fn()
              .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                callback(queryDocumentSnapshot);
                callback(queryDocumentSnapshot);
                callback(queryDocumentSnapshot);
              });
            querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
              forEach: forEachMock,
            });
            onSnapshotMock = jest
              .fn()
              .mockImplementation((onNext: (snapshot: QuerySnapshot<IFirebaseDm>) => void): void => {
                onNext(querySnapshot);
              });
            collectionReference = createMock<CollectionReference<IFirebaseDm>>({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should notify that the Firebase DMs changed without DM`, (): void => {
            expect.assertions(2);

            service.watchDms();

            expect(notifyOnDmsChangeSpy).toHaveBeenCalledTimes(1);
            expect(notifyOnDmsChangeSpy).toHaveBeenCalledWith([] as IFirebaseDm[]);
          });
        });
      });
    });
  });
});
