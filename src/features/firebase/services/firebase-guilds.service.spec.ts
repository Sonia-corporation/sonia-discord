import * as admin from "firebase-admin";
import { of } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseAppService } from "./firebase-app.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import App = admin.app.App;
import CollectionReference = admin.firestore.CollectionReference;
import DocumentData = admin.firestore.DocumentData;
import Firestore = admin.firestore.Firestore;
import QuerySnapshot = admin.firestore.QuerySnapshot;

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`, (): unknown => {
  return {
    credential: {},
    firestore: jest.fn().mockReturnValue(createMock<Firestore>()),
  };
});

describe(`FirebaseGuildsService`, (): void => {
  let service: FirebaseGuildsService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let firebaseAppService: FirebaseAppService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseAppService = FirebaseAppService.getInstance();
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
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let app: App;

    let firebaseAppServiceGetAppSpy: jest.SpyInstance;
    let getGuildsCountSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let firestoreSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      app = createMock<App>();

      firebaseAppServiceGetAppSpy = jest
        .spyOn(firebaseAppService, `getApp`)
        .mockReturnValue(app);
      getGuildsCountSpy = jest
        .spyOn(service, `getGuildsCount`)
        .mockReturnValue(Promise.resolve(8));
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      firestoreSpy = jest
        .spyOn(admin, `firestore`)
        .mockReturnValue(createMock<Firestore>());
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

    it(`should count the guilds in the store`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(getGuildsCountSpy).toHaveBeenCalledTimes(1);
      expect(getGuildsCountSpy).toHaveBeenCalledWith();
    });

    describe(`when the count of guilds was successful`, (): void => {
      beforeEach((): void => {
        getGuildsCountSpy.mockReturnValue(Promise.resolve(8));
      });

      describe(`when the count is 1`, (): void => {
        beforeEach((): void => {
          getGuildsCountSpy.mockReturnValue(of(1).toPromise());
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
          getGuildsCountSpy.mockReturnValue(of(8).toPromise());
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

  describe(`getCollectionReference()`, (): void => {
    let firestore: Firestore;
    let collectionReference: CollectionReference<DocumentData>;

    let loggerServiceWarningSpy: jest.SpyInstance;
    let collectionMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      collectionReference = createMock<CollectionReference<DocumentData>>();
      collectionMock = jest.fn().mockReturnValue(collectionReference);
      firestore = createMock<Firestore>({
        collection: collectionMock,
      });

      loggerServiceWarningSpy = jest
        .spyOn(loggerService, `warning`)
        .mockImplementation();
    });

    describe(`when the store is not set`, (): void => {
      beforeEach((): void => {
        jest.spyOn(admin, `firestore`).mockImplementation();

        service.init();
      });

      it(`should not get the guilds collection from the store`, (): void => {
        expect.assertions(1);

        service.getCollectionReference();

        expect(collectionMock).not.toHaveBeenCalled();
      });

      it(`should log a warning about the store being not set`, (): void => {
        expect.assertions(2);

        service.getCollectionReference();

        expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceWarningSpy).toHaveBeenNthCalledWith(2, {
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

        service.init();
      });

      it(`should get the guilds collection from the store`, (): void => {
        expect.assertions(2);

        service.getCollectionReference();

        expect(collectionMock).toHaveBeenCalledTimes(2);
        expect(collectionMock).toHaveBeenNthCalledWith(2, `/guilds`);
      });

      it(`should not log a warning about the store being not set`, (): void => {
        expect.assertions(1);

        service.getCollectionReference();

        expect(loggerServiceWarningSpy).not.toHaveBeenCalled();
      });

      it(`should return the guilds collection`, (): void => {
        expect.assertions(1);

        const result = service.getCollectionReference();

        expect(result).toStrictEqual(collectionReference);
      });
    });
  });

  describe(`getGuilds()`, (): void => {
    let collectionReference: CollectionReference<DocumentData>;
    let querySnapshot: QuerySnapshot<DocumentData>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      querySnapshot = createMock<QuerySnapshot<DocumentData>>();
      collectionReference = createMock<CollectionReference<DocumentData>>({
        get: (): Promise<QuerySnapshot<DocumentData>> => {
          return Promise.resolve(querySnapshot);
        },
      });

      getCollectionReferenceSpy = jest
        .spyOn(service, `getCollectionReference`)
        .mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getGuilds()).rejects.toThrow(
        new Error(`Collection not available`)
      );

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getGuilds()).rejects.toThrow(
          new Error(`Collection not available`)
        );
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should return the guilds collection`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getGuilds();

        expect(result).toStrictEqual(collectionReference);
      });
    });
  });

  describe(`getGuildsCount()`, (): void => {
    let collectionReference: CollectionReference<DocumentData>;
    let querySnapshot: QuerySnapshot<DocumentData>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      querySnapshot = createMock<QuerySnapshot<DocumentData>>({
        size: 8,
      });
      collectionReference = createMock<CollectionReference<DocumentData>>({
        get: (): Promise<QuerySnapshot<DocumentData>> => {
          return Promise.resolve(querySnapshot);
        },
      });

      getCollectionReferenceSpy = jest
        .spyOn(service, `getCollectionReference`)
        .mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getGuildsCount()).rejects.toThrow(
        new Error(`Collection not available`)
      );

      expect(getCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(getCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(undefined);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getGuildsCount()).rejects.toThrow(
          new Error(`Collection not available`)
        );
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should return the size of the guilds collection`, async (): Promise<
        void
      > => {
        expect.assertions(1);

        const result = await service.getGuildsCount();

        expect(result).toStrictEqual(8);
      });
    });
  });
});
