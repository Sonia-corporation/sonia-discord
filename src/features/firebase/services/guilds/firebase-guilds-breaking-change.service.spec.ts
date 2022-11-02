import { FirebaseGuildsBreakingChangeService } from './firebase-guilds-breaking-change.service';
import { FirebaseGuildsService } from './firebase-guilds.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { DiscordClientService } from '../../../discord/services/discord-client.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import * as admin from 'firebase-admin';
import { firstValueFrom, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsBreakingChangeService`, (): void => {
  let service: FirebaseGuildsBreakingChangeService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsBreakingChange service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsBreakingChangeService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsBreakingChangeService));
    });

    it(`should return the created FirebaseGuildsBreakingChange service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsBreakingChangeService.getInstance();

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

    it(`should notify the FirebaseGuildsBreakingChange service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsBreakingChangeService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_BREAKING_CHANGE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let querySnapshot: admin.firestore.QuerySnapshot<IFirebaseGuild>;
    let writeBatch: admin.firestore.WriteBatch;
    let queryDocumentSnapshot: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>;
    let writeResults: admin.firestore.WriteResult[];

    let notifyHasFinishedSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let isReady$Spy: jest.SpyInstance;
    let firebaseGuildsServiceGetGuildsSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetBatchSpy: jest.SpyInstance;
    let forEachMock: jest.Mock;
    let commitMock: jest.Mock;
    let updateMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
      queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>();
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
      writeResults = createMock<admin.firestore.WriteResult[]>();
      commitMock = jest.fn().mockResolvedValue(writeResults);
      updateMock = jest.fn().mockImplementation();
      writeBatch = createMock<admin.firestore.WriteBatch>({
        commit: commitMock,
        update: updateMock,
      });

      notifyHasFinishedSpy = jest.spyOn(service, `notifyHasFinished`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
      isReady$Spy = jest.spyOn(service, `isReady$`).mockReturnValue(throwError(new Error(`isReady$ error`)));
      firebaseGuildsServiceGetGuildsSpy = jest
        .spyOn(firebaseGuildsService, `getGuilds`)
        .mockRejectedValue(new Error(`getGuilds error`));
      firebaseGuildsServiceGetBatchSpy = jest.spyOn(firebaseGuildsService, `getBatch`).mockImplementation();
    });

    it(`should wait for everything to be ready`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.init()).rejects.toThrow(new Error(`isReady$ error`));

      expect(isReady$Spy).toHaveBeenCalledTimes(1);
      expect(isReady$Spy).toHaveBeenCalledWith();
    });

    describe(`when an error occurred while waiting for everything to be ready`, (): void => {
      beforeEach((): void => {
        isReady$Spy.mockReturnValue(throwError(new Error(`isReady$ error`)));
      });

      it(`should not get a batch for the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`isReady$ error`));

        expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not update the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`isReady$ error`));

        expect(updateMock).not.toHaveBeenCalled();
      });

      it(`should not commit the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`isReady$ error`));

        expect(commitMock).not.toHaveBeenCalled();
      });

      it(`should not notify that the Firebase guilds breaking changes are finished`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`isReady$ error`));

        expect(notifyHasFinishedSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when everything is ready`, (): void => {
      beforeEach((): void => {
        isReady$Spy.mockReturnValue(of([true, true]));
      });

      it(`should log about handling the breaking changes of the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(new Error(`getGuilds error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsBreakingChangeService`,
          message: `text-handling breaking changes for all Firebase guilds...`,
        } as ILoggerLog);
      });

      it(`should get the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(new Error(`getGuilds error`));

        expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledWith();
      });

      describe(`when the Firebase guilds failed to be fetched`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockRejectedValue(new Error(`getGuilds error`));
        });

        it(`should not get a batch for the Firebase guilds`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`getGuilds error`));

          expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
        });

        it(`should not update the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`getGuilds error`));

          expect(updateMock).not.toHaveBeenCalled();
        });

        it(`should not commit the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`getGuilds error`));

          expect(commitMock).not.toHaveBeenCalled();
        });

        it(`should not notify that the Firebase guilds breaking changes are finished`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`getGuilds error`));

          expect(notifyHasFinishedSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the Firebase guilds were successfully fetched`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
        });

        it(`should log that the Firebase guilds were fetched`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.init()).rejects.toThrow(new Error(`Firebase guilds batch not available`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseGuildsBreakingChangeService`,
            message: `text-guilds fetched`,
          } as ILoggerLog);
        });

        it(`should get a batch for the Firebase guilds`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.init()).rejects.toThrow(new Error(`Firebase guilds batch not available`));

          expect(firebaseGuildsServiceGetBatchSpy).toHaveBeenCalledTimes(1);
          expect(firebaseGuildsServiceGetBatchSpy).toHaveBeenCalledWith();
        });

        describe(`when the batch is not available`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceGetBatchSpy.mockReturnValue(undefined);
          });

          it(`should log an error about no batch available`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.init()).rejects.toThrow(new Error(`Firebase guilds batch not available`));

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsBreakingChangeService`,
              message: `text-Firebase guilds batch not available`,
            } as ILoggerLog);
          });

          it(`should not update the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.init()).rejects.toThrow(new Error(`Firebase guilds batch not available`));

            expect(updateMock).not.toHaveBeenCalled();
          });

          it(`should not commit the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.init()).rejects.toThrow(new Error(`Firebase guilds batch not available`));

            expect(commitMock).not.toHaveBeenCalled();
          });

          it(`should not notify that the Firebase guilds breaking changes are finished`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.init()).rejects.toThrow(new Error(`Firebase guilds batch not available`));

            expect(notifyHasFinishedSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the batch is available`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceGetBatchSpy.mockReturnValue(writeBatch);
          });

          describe(`when there is no Firebase guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
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

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should not update the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.init();

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.init();

              expect(commitMock).not.toHaveBeenCalled();
            });
          });

          describe(`when there is a Firebase guild but on latest version`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuildVFinal>>({
                data: (): IFirebaseGuildVFinal =>
                  createMock<IFirebaseGuildVFinal>({
                    version: FirebaseGuildVersionEnum.V5,
                  }),
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

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should not update the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.init();

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.init();

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should log that one guild is already up-to-date`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsBreakingChangeService`,
                message: `text-all Firebase guild hint-(1) up-to-date hint-(v5)`,
              } as ILoggerLog);
            });
          });

          describe(`when there is two Firebase guilds but on latest version`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuildVFinal>>({
                data: (): IFirebaseGuildVFinal =>
                  createMock<IFirebaseGuildVFinal>({
                    version: FirebaseGuildVersionEnum.V5,
                  }),
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should not update the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.init();

              expect(updateMock).not.toHaveBeenCalled();
            });

            it(`should not commit the batch`, async (): Promise<void> => {
              expect.assertions(1);

              await service.init();

              expect(commitMock).not.toHaveBeenCalled();
            });

            it(`should log that two guilds are already up-to-date`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsBreakingChangeService`,
                message: `text-all Firebase guilds hint-(2) up-to-date hint-(v5)`,
              } as ILoggerLog);
            });
          });

          describe(`when there is a Firebase guild on version 1`, (): void => {
            let firebaseGuildV1: IFirebaseGuildV1;

            beforeEach((): void => {
              firebaseGuildV1 = createMock<IFirebaseGuildV1>({
                id: `dummy-id`,
                version: FirebaseGuildVersionEnum.V1,
              });
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuildV1 => firebaseGuildV1,
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

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should update the batch to update the guild to the latest version available`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(updateMock).toHaveBeenCalledTimes(1);
              expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                channels: {},
                id: `dummy-id`,
                lastReleaseNotesVersion: `0.0.0`,
                version: FirebaseGuildVersionEnum.V5,
              } as IFirebaseGuildVFinal);
            });

            it(`should commit the batch`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(commitMock).toHaveBeenCalledTimes(1);
              expect(commitMock).toHaveBeenCalledWith();
            });

            it(`should log that one Firebase guild is updating`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsBreakingChangeService`,
                message: `text-updating value-1 Firebase guild...`,
              } as ILoggerLog);
            });
          });

          describe(`when there is two Firebase guilds on version 1`, (): void => {
            let firebaseGuildV1: IFirebaseGuildV1;

            beforeEach((): void => {
              firebaseGuildV1 = createMock<IFirebaseGuildV1>({
                id: `dummy-id`,
                version: FirebaseGuildVersionEnum.V1,
              });
              queryDocumentSnapshot = createMock<admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>>({
                data: (): IFirebaseGuildV1 => firebaseGuildV1,
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (callback: (result: admin.firestore.QueryDocumentSnapshot<IFirebaseGuild>) => void): void => {
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<admin.firestore.QuerySnapshot<IFirebaseGuild>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
            });

            it(`should update the batch to update the two guilds to the latest version available`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(updateMock).toHaveBeenCalledTimes(2);
              expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
                channels: {},
                id: `dummy-id`,
                lastReleaseNotesVersion: `0.0.0`,
                version: FirebaseGuildVersionEnum.V5,
              } as IFirebaseGuildVFinal);
            });

            it(`should commit the batch`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(commitMock).toHaveBeenCalledTimes(1);
              expect(commitMock).toHaveBeenCalledWith();
            });

            it(`should log that two Firebase guilds is updating`, async (): Promise<void> => {
              expect.assertions(2);

              await service.init();

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsBreakingChangeService`,
                message: `text-updating value-2 Firebase guilds...`,
              } as ILoggerLog);
            });
          });

          it(`should notify that the Firebase guilds breaking changes are finished`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(notifyHasFinishedSpy).toHaveBeenCalledTimes(1);
            expect(notifyHasFinishedSpy).toHaveBeenCalledWith();
          });
        });
      });
    });
  });

  describe(`hasFinished$()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
    });

    it(`should be false by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await firstValueFrom(service.hasFinished$().pipe(take(1)));

      expect(result).toBe(false);
    });

    describe(`when the has finished event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyHasFinished();

        const result = await firstValueFrom(service.hasFinished$().pipe(take(1)));

        expect(result).toBe(true);
      });
    });
  });

  describe(`hasFinished()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
    });

    describe(`when the has finished event is notified`, (): void => {
      beforeEach((): void => {
        service.notifyHasFinished();
      });

      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyHasFinished();

        const result = await service.hasFinished();

        expect(result).toBe(true);
      });
    });
  });

  describe(`notifyHasFinished()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
    });

    it(`should notify that the Firebase guilds breaking changes were handled`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyHasFinished();

      const result = await firstValueFrom(service.hasFinished$().pipe(take(1)));

      expect(result).toBe(true);
    });
  });

  describe(`isReady$()`, (): void => {
    let discordClientServiceIsReadySpy: jest.SpyInstance;
    let firebaseGuildsServiceIsReadySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsBreakingChangeService();
      discordClientServiceIsReadySpy = jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
      firebaseGuildsServiceIsReadySpy = jest.spyOn(firebaseGuildsService, `isReady`).mockResolvedValue(true);
    });

    describe(`when the Firebase guilds ready check failed`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockRejectedValue(new Error(`error`));
      });

      it(`should consider that the service is not ready`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(firstValueFrom(service.isReady$().pipe(take(1)))).rejects.toThrow(new Error(`error`));
      });
    });

    describe(`when the Firebase guilds are ready`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockResolvedValue(true);
      });

      describe(`when Discord ready check failed`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceIsReadySpy.mockRejectedValue(new Error(`error`));
        });

        it(`should consider that the service is not ready`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(firstValueFrom(service.isReady$().pipe(take(1)))).rejects.toThrow(new Error(`error`));
        });
      });

      describe(`when Discord is ready`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceIsReadySpy.mockResolvedValue(true);
        });

        it(`should consider that the service is ready`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await firstValueFrom(service.isReady$().pipe(take(1)));

          expect(result).toStrictEqual([true, true]);
        });
      });
    });
  });
});
