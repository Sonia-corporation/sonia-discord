import { Guild, Snowflake } from "discord.js";
import * as admin from "firebase-admin";
import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordClientService } from "../../discord/services/discord-client.service";
import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuild } from "../types/firebase-guild";
import { FirebaseAppService } from "./firebase-app.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import App = admin.app.App;
import CollectionReference = admin.firestore.CollectionReference;
import DocumentReference = admin.firestore.DocumentReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import Firestore = admin.firestore.Firestore;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import WriteResult = admin.firestore.WriteResult;
import WriteBatch = admin.firestore.WriteBatch;

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
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let app: App;
    let collectionReference: CollectionReference<IFirebaseGuild>;
    let querySnapshot: QuerySnapshot<IFirebaseGuild>;
    let queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuild>;
    let firebaseGuild: IFirebaseGuild;

    let discordClientServiceIsReadySpy: jest.SpyInstance;
    let firebaseAppServiceGetAppSpy: jest.SpyInstance;
    let getGuildsCountSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let firestoreSpy: jest.SpyInstance;
    let notifyIsReadySpy: jest.SpyInstance;
    let getCollectionReferenceSpy: jest.SpyInstance;
    let notifyOnGuildsChangeSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let onSnapshotMock: jest.Mock;
    let forEachMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      app = createMock<App>();
      firebaseGuild = createMock<IFirebaseGuild>();
      queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseGuild>>(
        {
          data: jest.fn().mockReturnValue(firebaseGuild),
          exists: true,
        }
      );
      forEachMock = jest
        .fn()
        .mockImplementation(
          (
            callback: (result: QueryDocumentSnapshot<IFirebaseGuild>) => void
          ): void => {
            callback(queryDocumentSnapshot);
          }
        );
      querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>({
        forEach: forEachMock,
      });
      onSnapshotMock = jest
        .fn()
        .mockImplementation(
          (onNext: (snapshot: QuerySnapshot<IFirebaseGuild>) => void): void => {
            onNext(querySnapshot);
          }
        );
      collectionReference = createMock<CollectionReference<IFirebaseGuild>>({
        onSnapshot: onSnapshotMock,
      });

      discordClientServiceIsReadySpy = jest
        .spyOn(discordClientService, `isReady`)
        .mockResolvedValue(true);
      firebaseAppServiceGetAppSpy = jest
        .spyOn(firebaseAppService, `getApp`)
        .mockReturnValue(app);
      getGuildsCountSpy = jest
        .spyOn(service, `getGuildsCount`)
        .mockResolvedValue(8);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      firestoreSpy = jest
        .spyOn(admin, `firestore`)
        .mockReturnValue(createMock<Firestore>());
      notifyIsReadySpy = jest
        .spyOn(service, `notifyIsReady`)
        .mockImplementation();
      getCollectionReferenceSpy = jest
        .spyOn(service, `getCollectionReference`)
        .mockImplementation();
      notifyOnGuildsChangeSpy = jest
        .spyOn(service, `notifyOnGuildsChange`)
        .mockImplementation();
      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
    });

    it(`should wait for the Discord app to be ready`, async (): Promise<
      void
    > => {
      expect.assertions(3);

      await expect(service.init()).rejects.toThrow(
        new Error(`Collection not available`)
      );

      expect(discordClientServiceIsReadySpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceIsReadySpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord app failed to be ready`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockRejectedValue(new Error(`error`));
      });

      // @todo add coverage
    });

    describe(`once the Discord app is ready`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockResolvedValue(true);
      });

      it(`should get the Firebase app`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(
          new Error(`Collection not available`)
        );

        expect(firebaseAppServiceGetAppSpy).toHaveBeenCalledTimes(1);
        expect(firebaseAppServiceGetAppSpy).toHaveBeenCalledWith();
      });

      it(`should create the store`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(
          new Error(`Collection not available`)
        );

        expect(firestoreSpy).toHaveBeenCalledTimes(1);
        expect(firestoreSpy).toHaveBeenCalledWith(app);
      });

      it(`should notify that the Firebase app is ready`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(
          new Error(`Collection not available`)
        );

        expect(notifyIsReadySpy).toHaveBeenCalledTimes(1);
        expect(notifyIsReadySpy).toHaveBeenCalledWith();
      });

      it(`should count the guilds in the store`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(
          new Error(`Collection not available`)
        );

        expect(getGuildsCountSpy).toHaveBeenCalledTimes(1);
        expect(getGuildsCountSpy).toHaveBeenCalledWith();
      });

      describe(`when the count of guilds failed`, (): void => {
        beforeEach((): void => {
          getGuildsCountSpy.mockRejectedValue(new Error(`error`));
        });

        it(`should not log the count of guilds`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(
            new Error(`Collection not available`)
          );

          expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsService`,
            message: `text-value-8 guilds found`,
          } as ILoggerLog);
        });

        it(`should not listen for the Firebase guilds snapshot to change`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.getGuilds()).rejects.toThrow(
            new Error(`Collection not available`)
          );

          expect(onSnapshotMock).not.toHaveBeenCalled();
        });

        it(`should not notify that the Firebase guilds changed`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.getGuilds()).rejects.toThrow(
            new Error(`Collection not available`)
          );

          expect(notifyOnGuildsChangeSpy).not.toHaveBeenCalled();
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
            expect.assertions(3);

            await expect(service.init()).rejects.toThrow(
              new Error(`Collection not available`)
            );

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
            expect.assertions(3);

            await expect(service.init()).rejects.toThrow(
              new Error(`Collection not available`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsService`,
              message: `text-value-8 guilds found`,
            } as ILoggerLog);
          });
        });
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

        it(`should not listen for the Firebase guilds snapshot to change`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.getGuilds()).rejects.toThrow(
            new Error(`Collection not available`)
          );

          expect(onSnapshotMock).not.toHaveBeenCalled();
        });

        it(`should not notify that the Firebase guilds changed`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.getGuilds()).rejects.toThrow(
            new Error(`Collection not available`)
          );

          expect(notifyOnGuildsChangeSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the guilds collection is valid`, (): void => {
        beforeEach((): void => {
          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should log about watching Firebase guilds`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await service.init();

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
            context: `FirebaseGuildsService`,
            message: `text-watching Firebase guilds...`,
          } as ILoggerLog);
        });

        it(`should listen for the Firebase guilds snapshot to change`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          await service.init();

          expect(onSnapshotMock).toHaveBeenCalledTimes(1);
        });

        describe(`when an error occurred when fetching the Firebase guilds`, (): void => {
          beforeEach((): void => {
            onSnapshotMock = jest
              .fn()
              .mockImplementation(
                (
                  _callback: () => void,
                  onError: (error: Error) => void
                ): void => {
                  onError(new Error(`error`));
                }
              );
            collectionReference = createMock<
              CollectionReference<IFirebaseGuild>
            >({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should log that the Firebase watcher catch an error`, async (): Promise<
            void
          > => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
              context: `FirebaseGuildsService`,
              message: `text-Firebase guilds watcher catch an error`,
            } as ILoggerLog);
          });

          it(`should log the error`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
              context: `FirebaseGuildsService`,
              message: `error-Error: error`,
            } as ILoggerLog);
          });
        });

        describe(`when the Firebase guilds were successfully fetched`, (): void => {
          beforeEach((): void => {
            onSnapshotMock = jest
              .fn()
              .mockImplementation(
                (
                  onNext: (snapshot: QuerySnapshot<IFirebaseGuild>) => void
                ): void => {
                  onNext(querySnapshot);
                }
              );
            collectionReference = createMock<
              CollectionReference<IFirebaseGuild>
            >({
              onSnapshot: onSnapshotMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          describe(`when Firebase has one valid guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuild>
              >({
                data: jest.fn().mockReturnValue(firebaseGuild),
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuild>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>({
                forEach: forEachMock,
              });
              onSnapshotMock = jest
                .fn()
                .mockImplementation(
                  (
                    onNext: (snapshot: QuerySnapshot<IFirebaseGuild>) => void
                  ): void => {
                    onNext(querySnapshot);
                  }
                );
              collectionReference = createMock<
                CollectionReference<IFirebaseGuild>
              >({
                onSnapshot: onSnapshotMock,
              });

              getCollectionReferenceSpy.mockReturnValue(collectionReference);
            });

            it(`should notify that the Firebase guilds changed with one guild`, async (): Promise<
              void
            > => {
              expect.assertions(2);

              await service.init();

              expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
              expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith([
                firebaseGuild,
              ] as IFirebaseGuild[]);
            });
          });

          describe(`when Firebase has one invalid guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuild>
              >({
                data: jest.fn().mockReturnValue(firebaseGuild),
                exists: false,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuild>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>({
                forEach: forEachMock,
              });
              onSnapshotMock = jest
                .fn()
                .mockImplementation(
                  (
                    onNext: (snapshot: QuerySnapshot<IFirebaseGuild>) => void
                  ): void => {
                    onNext(querySnapshot);
                  }
                );
              collectionReference = createMock<
                CollectionReference<IFirebaseGuild>
              >({
                onSnapshot: onSnapshotMock,
              });

              getCollectionReferenceSpy.mockReturnValue(collectionReference);
            });

            it(`should notify that the Firebase guilds changed without guild`, async (): Promise<
              void
            > => {
              expect.assertions(2);

              await service.init();

              expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
              expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith(
                [] as IFirebaseGuild[]
              );
            });
          });

          describe(`when Firebase has multiple valid guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuild>
              >({
                data: jest.fn().mockReturnValue(firebaseGuild),
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuild>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>({
                forEach: forEachMock,
              });
              onSnapshotMock = jest
                .fn()
                .mockImplementation(
                  (
                    onNext: (snapshot: QuerySnapshot<IFirebaseGuild>) => void
                  ): void => {
                    onNext(querySnapshot);
                  }
                );
              collectionReference = createMock<
                CollectionReference<IFirebaseGuild>
              >({
                onSnapshot: onSnapshotMock,
              });

              getCollectionReferenceSpy.mockReturnValue(collectionReference);
            });

            it(`should notify that the Firebase guilds changed with all valid guild`, async (): Promise<
              void
            > => {
              expect.assertions(2);

              await service.init();

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
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuild>
              >({
                data: jest.fn().mockReturnValue(firebaseGuild),
                exists: false,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuild>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>({
                forEach: forEachMock,
              });
              onSnapshotMock = jest
                .fn()
                .mockImplementation(
                  (
                    onNext: (snapshot: QuerySnapshot<IFirebaseGuild>) => void
                  ): void => {
                    onNext(querySnapshot);
                  }
                );
              collectionReference = createMock<
                CollectionReference<IFirebaseGuild>
              >({
                onSnapshot: onSnapshotMock,
              });

              getCollectionReferenceSpy.mockReturnValue(collectionReference);
            });

            it(`should notify that the Firebase guilds changed without guild`, async (): Promise<
              void
            > => {
              expect.assertions(2);

              await service.init();

              expect(notifyOnGuildsChangeSpy).toHaveBeenCalledTimes(1);
              expect(notifyOnGuildsChangeSpy).toHaveBeenCalledWith(
                [] as IFirebaseGuild[]
              );
            });
          });
        });
      });
    });
  });

  describe(`getCollectionReference()`, (): void => {
    let firestore: Firestore;
    let collectionReference: CollectionReference<IFirebaseGuild>;

    let loggerServiceWarningSpy: jest.SpyInstance;
    let collectionMock: jest.Mock<
      CollectionReference<IFirebaseGuild>,
      string[]
    >;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      collectionReference = createMock<CollectionReference<IFirebaseGuild>>();
      collectionMock = jest.fn().mockReturnValue(collectionReference);
      firestore = createMock<Firestore>({
        collection: collectionMock,
      });

      loggerServiceWarningSpy = jest
        .spyOn(loggerService, `warning`)
        .mockImplementation();
      jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
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

        expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(3);
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

        expect(collectionMock).toHaveBeenCalledTimes(3);
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
    let collectionReference: CollectionReference<IFirebaseGuild>;
    let querySnapshot: QuerySnapshot<IFirebaseGuild>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>();
      collectionReference = createMock<CollectionReference<IFirebaseGuild>>({
        get: (): Promise<QuerySnapshot<IFirebaseGuild>> => {
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

        expect(result).toStrictEqual(querySnapshot);
      });
    });
  });

  describe(`getGuildsCount()`, (): void => {
    let collectionReference: CollectionReference<IFirebaseGuild>;
    let querySnapshot: QuerySnapshot<IFirebaseGuild>;

    let getCollectionReferenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      querySnapshot = createMock<QuerySnapshot<IFirebaseGuild>>({
        size: 8,
      });
      collectionReference = createMock<CollectionReference<IFirebaseGuild>>({
        get: (): Promise<QuerySnapshot<IFirebaseGuild>> => {
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

  describe(`hasGuild()`, (): void => {
    let guildId: Snowflake;
    let documentReference: DocumentReference<IFirebaseGuild>;
    let collectionReference: CollectionReference<IFirebaseGuild>;
    let documentSnapshot: DocumentSnapshot<IFirebaseGuild>;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let docMock: jest.Mock<DocumentSnapshot<IFirebaseGuild>, string[]>;
    let getMock: jest.Mock<void, IFirebaseGuild[]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      guildId = `dummy-guild-id`;
      documentSnapshot = createMock<DocumentSnapshot<IFirebaseGuild>>();
      getMock = jest.fn().mockResolvedValue(documentSnapshot);
      documentReference = createMock<DocumentReference<IFirebaseGuild>>({
        get: getMock,
      });
      docMock = jest.fn().mockReturnValue(documentReference);
      collectionReference = createMock<CollectionReference<IFirebaseGuild>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest
        .spyOn(service, `getCollectionReference`)
        .mockImplementation();
      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.hasGuild(guildId)).rejects.toThrow(
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

        await expect(service.hasGuild(guildId)).rejects.toThrow(
          new Error(`Collection not available`)
        );
      });

      it(`should not get the guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.hasGuild(guildId)).rejects.toThrow(
          new Error(`Collection not available`)
        );

        expect(docMock).not.toHaveBeenCalled();
        expect(getMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should get the guild with the given guild id`, async (): Promise<
        void
      > => {
        expect.assertions(5);

        const hasGuild = await service.hasGuild(guildId);

        expect(hasGuild).toStrictEqual(false);
        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(guildId);
        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith();
      });

      describe(`when the fetch of the guild failed`, (): void => {
        beforeEach((): void => {
          getMock = jest.fn().mockRejectedValue(new Error(`error`));
          documentReference = createMock<DocumentReference<IFirebaseGuild>>({
            get: getMock,
          });
          docMock = jest.fn().mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseGuild>>(
            {
              doc: docMock,
            }
          );

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

          const hasGuild = await service.hasGuild(guildId);

          expect(hasGuild).toStrictEqual(false);
        });
      });

      describe(`when the fetch of the guild was successful`, (): void => {
        beforeEach((): void => {
          documentSnapshot = createMock<DocumentSnapshot<IFirebaseGuild>>();
          getMock = jest.fn().mockResolvedValue(documentSnapshot);
          documentReference = createMock<DocumentReference<IFirebaseGuild>>({
            get: getMock,
          });
          docMock = jest.fn().mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseGuild>>(
            {
              doc: docMock,
            }
          );

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        describe(`when the guild does not exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<DocumentSnapshot<IFirebaseGuild>>({
              exists: false,
            });
            getMock = jest.fn().mockResolvedValue(documentSnapshot);
            documentReference = createMock<DocumentReference<IFirebaseGuild>>({
              get: getMock,
            });
            docMock = jest.fn().mockReturnValue(documentReference);
            collectionReference = createMock<
              CollectionReference<IFirebaseGuild>
            >({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(1);

            const hasGuild = await service.hasGuild(guildId);

            expect(hasGuild).toStrictEqual(false);
          });
        });

        describe(`when the guild exists`, (): void => {
          beforeEach((): void => {
            documentSnapshot = createMock<DocumentSnapshot<IFirebaseGuild>>({
              exists: true,
            });
            getMock = jest.fn().mockResolvedValue(documentSnapshot);
            documentReference = createMock<DocumentReference<IFirebaseGuild>>({
              get: getMock,
            });
            docMock = jest.fn().mockReturnValue(documentReference);
            collectionReference = createMock<
              CollectionReference<IFirebaseGuild>
            >({
              doc: docMock,
            });

            getCollectionReferenceSpy.mockReturnValue(collectionReference);
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(1);

            const hasGuild = await service.hasGuild(guildId);

            expect(hasGuild).toStrictEqual(true);
          });
        });
      });
    });
  });

  describe(`addGuild()`, (): void => {
    let guild: Guild;
    let documentReference: DocumentReference<IFirebaseGuild>;
    let collectionReference: CollectionReference<IFirebaseGuild>;
    let writeResult: WriteResult;

    let getCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let docMock: jest.Mock<DocumentReference<IFirebaseGuild>, string[]>;
    let setMock: jest.Mock<WriteResult, IFirebaseGuild[]>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      guild = createMock<Guild>({
        id: `dummy-id`,
      });
      writeResult = createMock<WriteResult>();
      setMock = jest.fn().mockResolvedValue(writeResult);
      documentReference = createMock<DocumentReference<IFirebaseGuild>>({
        set: setMock,
      });
      docMock = jest.fn().mockReturnValue(documentReference);
      collectionReference = createMock<CollectionReference<IFirebaseGuild>>({
        doc: docMock,
      });

      getCollectionReferenceSpy = jest
        .spyOn(service, `getCollectionReference`)
        .mockImplementation();
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceSuccessSpy = jest
        .spyOn(loggerService, `success`)
        .mockImplementation();
    });

    it(`should get the guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.addGuild(guild)).rejects.toThrow(
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

        await expect(service.addGuild(guild)).rejects.toThrow(
          new Error(`Collection not available`)
        );
      });

      it(`should not add the given guild into Firebase`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.addGuild(guild)).rejects.toThrow(
          new Error(`Collection not available`)
        );

        expect(docMock).not.toHaveBeenCalled();
        expect(setMock).not.toHaveBeenCalled();
      });
    });

    describe(`when the guilds collection is valid`, (): void => {
      beforeEach((): void => {
        getCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log about creating the given Firebase guild`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await service.addGuild(guild);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsService`,
          message: `text-creating Firebase guild...`,
        } as ILoggerLog);
      });

      it(`should add the given guild into Firebase`, async (): Promise<
        void
      > => {
        expect.assertions(6);

        await service.addGuild(guild);

        expect(docMock).toHaveBeenCalledTimes(1);
        expect(docMock).toHaveBeenCalledWith(`dummy-id`);
        expect(setMock).toHaveBeenCalledTimes(1);
        expect(
          moment(setMock.mock.calls[0][0].creationDate).fromNow()
        ).toStrictEqual(`a few seconds ago`);
        expect(setMock.mock.calls[0][0].id).toStrictEqual(`dummy-id`);
        expect(setMock.mock.calls[0][0].version).toStrictEqual(
          FirebaseGuildVersionEnum.V1
        );
      });

      describe(`when the guild was not successfully added into Firebase`, (): void => {
        beforeEach((): void => {
          setMock = jest.fn().mockRejectedValue(new Error(`error`));
          documentReference = createMock<DocumentReference<IFirebaseGuild>>({
            set: setMock,
          });
          docMock = jest.fn().mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseGuild>>(
            {
              doc: docMock,
            }
          );

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.addGuild(guild)).rejects.toThrow(
            new Error(`error`)
          );
        });
      });

      describe(`when the guild was successfully added into Firebase`, (): void => {
        beforeEach((): void => {
          writeResult = createMock<WriteResult>();
          setMock = jest.fn().mockResolvedValue(writeResult);
          documentReference = createMock<DocumentReference<IFirebaseGuild>>({
            set: setMock,
          });
          docMock = jest.fn().mockReturnValue(documentReference);
          collectionReference = createMock<CollectionReference<IFirebaseGuild>>(
            {
              doc: docMock,
            }
          );

          getCollectionReferenceSpy.mockReturnValue(collectionReference);
        });

        it(`should about the success of adding the guild into Firebase`, async (): Promise<
          void
        > => {
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

    it(`should be false by default`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.isReady$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (isTrue: boolean): void => {
          expect(isTrue).toStrictEqual(false);
          doneCallback();
        },
      });
    });

    describe(`when the is ready event is notified`, (): void => {
      it(`should emit a new value into the stream`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.notifyIsReady();
        service.isReady$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (isTrue: boolean): void => {
            expect(isTrue).toStrictEqual(true);
            doneCallback();
          },
        });
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

        const isReady = await service.isReady();

        expect(isReady).toStrictEqual(true);
      });
    });
  });

  describe(`notifyIsReady()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsService();
    });

    it(`should notify that the Firebase app is ready`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.notifyIsReady();
      service.isReady$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (isTrue: boolean): void => {
          expect(isTrue).toStrictEqual(true);
          doneCallback();
        },
      });
    });
  });

  describe(`onGuildsChange$()`, (): void => {
    let firebaseGuilds: IFirebaseGuild[];

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      firebaseGuilds = createMock<IFirebaseGuild[]>();
    });

    it(`should be an empty array by default`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.onGuildsChange$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (firebaseGuilds: IFirebaseGuild[]): void => {
          expect(firebaseGuilds).toStrictEqual([]);
          doneCallback();
        },
      });
    });

    describe(`when the on guilds change event is notified`, (): void => {
      it(`should emit a new value into the stream`, (doneCallback: jest.DoneCallback): void => {
        expect.assertions(1);

        service.notifyOnGuildsChange(firebaseGuilds);
        service.onGuildsChange$().subscribe({
          error: (error): void => {
            expect(true).toStrictEqual(false);
            doneCallback(error);
          },
          next: (firebaseGuilds: IFirebaseGuild[]): void => {
            expect(firebaseGuilds).toStrictEqual(firebaseGuilds);
            doneCallback();
          },
        });
      });
    });
  });

  describe(`notifyOnGuildsChange()`, (): void => {
    let firebaseGuilds: IFirebaseGuild[];

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      firebaseGuilds = createMock<IFirebaseGuild[]>();
    });

    it(`should notify that the Firebase guilds changed`, (doneCallback: jest.DoneCallback): void => {
      expect.assertions(1);

      service.notifyOnGuildsChange(firebaseGuilds);
      service.onGuildsChange$().subscribe({
        error: (error): void => {
          expect(true).toStrictEqual(false);
          doneCallback(error);
        },
        next: (result: IFirebaseGuild[]): void => {
          expect(result).toStrictEqual(firebaseGuilds);
          doneCallback();
        },
      });
    });
  });

  describe(`getBatch()`, (): void => {
    let firestore: Firestore;
    let writeBatch: WriteBatch;

    let batchMock: jest.Mock<WriteBatch>;

    beforeEach((): void => {
      service = new FirebaseGuildsService();
      writeBatch = createMock<WriteBatch>();
      batchMock = jest.fn().mockReturnValue(writeBatch);
      firestore = createMock<Firestore>({
        batch: batchMock,
      });

      jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
    });

    describe(`when the store is not set`, (): void => {
      beforeEach((): void => {
        jest.spyOn(admin, `firestore`).mockImplementation();

        service.init();
      });

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

        service.init();
      });

      it(`should get the batch from the store`, (): void => {
        expect.assertions(2);

        service.getBatch();

        expect(batchMock).toHaveBeenCalledTimes(3);
        expect(batchMock).toHaveBeenNthCalledWith(2);
      });

      it(`should return the batch`, (): void => {
        expect.assertions(1);

        const result = service.getBatch();

        expect(result).toStrictEqual(writeBatch);
      });
    });
  });
});
