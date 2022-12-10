import { FirebaseDmsBreakingChangeService } from './firebase-dms-breaking-change.service';
import { FirebaseDmsService } from './firebase-dms.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmV1 } from '../../interfaces/dms/firebase-dm-v1';
import { IFirebaseDm } from '../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../types/dms/firebase-dm-v-final';
import { QueryDocumentSnapshot, QuerySnapshot, WriteBatch, WriteResult } from 'firebase-admin/firestore';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsBreakingChangeService`, (): void => {
  let service: FirebaseDmsBreakingChangeService;
  let coreEventService: CoreEventService;
  let firebaseDmsService: FirebaseDmsService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseDmsService = FirebaseDmsService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsBreakingChange service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsBreakingChangeService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsBreakingChangeService));
    });

    it(`should return the created FirebaseDmsBreakingChange service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsBreakingChangeService.getInstance();

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

    it(`should notify the FirebaseDmsBreakingChange service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsBreakingChangeService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_BREAKING_CHANGE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let querySnapshot: QuerySnapshot<IFirebaseDm>;
    let writeBatch: WriteBatch;
    let queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseDm>;
    let writeResults: WriteResult[];

    let notifyHasFinishedSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let firebaseDmsServiceGetDmsSpy: jest.SpyInstance;
    let firebaseDmsServiceGetBatchSpy: jest.SpyInstance;
    let forEachMock: jest.Mock;
    let commitMock: jest.Mock;
    let updateMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseDmsBreakingChangeService();
      queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>();
      forEachMock = jest
        .fn()
        .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
          callback(queryDocumentSnapshot);
        });
      querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
        forEach: forEachMock,
      });
      writeResults = createMock<WriteResult[]>();
      commitMock = jest.fn().mockResolvedValue(writeResults);
      updateMock = jest.fn().mockImplementation();
      writeBatch = createMock<WriteBatch>({
        commit: commitMock,
        update: updateMock,
      });

      notifyHasFinishedSpy = jest.spyOn(service, `notifyHasFinished`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
      firebaseDmsServiceGetDmsSpy = jest
        .spyOn(firebaseDmsService, `getDms`)
        .mockRejectedValue(new Error(`getDms error`));
      firebaseDmsServiceGetBatchSpy = jest.spyOn(firebaseDmsService, `getBatch`).mockImplementation();
    });

    it(`should log about handling the breaking changes of the Firebase DMs`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.init()).rejects.toThrow(new Error(`getDms error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `FirebaseDmsBreakingChangeService`,
        message: `text-handling breaking changes for all Firebase DMs...`,
      } as ILoggerLog);
    });

    it(`should get the Firebase DMs`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.init()).rejects.toThrow(new Error(`getDms error`));

      expect(firebaseDmsServiceGetDmsSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsServiceGetDmsSpy).toHaveBeenCalledWith();
    });

    describe(`when the Firebase DMs failed to be fetched`, (): void => {
      beforeEach((): void => {
        firebaseDmsServiceGetDmsSpy.mockRejectedValue(new Error(`getDms error`));
      });

      it(`should not get a batch for the Firebase DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`getDms error`));

        expect(firebaseDmsServiceGetBatchSpy).not.toHaveBeenCalled();
      });

      it(`should not update the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`getDms error`));

        expect(updateMock).not.toHaveBeenCalled();
      });

      it(`should not commit the batch`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`getDms error`));

        expect(commitMock).not.toHaveBeenCalled();
      });

      it(`should not notify that the Firebase DMs breaking changes are finished`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.init()).rejects.toThrow(new Error(`getDms error`));

        expect(notifyHasFinishedSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase DMs were successfully fetched`, (): void => {
      beforeEach((): void => {
        firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
      });

      it(`should log that the Firebase DMs were fetched`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(new Error(`Firebase DMs batch not available`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `FirebaseDmsBreakingChangeService`,
          message: `text-DMs fetched`,
        } as ILoggerLog);
      });

      it(`should get a batch for the Firebase DMs`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.init()).rejects.toThrow(new Error(`Firebase DMs batch not available`));

        expect(firebaseDmsServiceGetBatchSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsServiceGetBatchSpy).toHaveBeenCalledWith();
      });

      describe(`when the batch is not available`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceGetBatchSpy.mockReturnValue(undefined);
        });

        it(`should log an error about no batch available`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.init()).rejects.toThrow(new Error(`Firebase DMs batch not available`));

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsBreakingChangeService`,
            message: `text-Firebase DMs batch not available`,
          } as ILoggerLog);
        });

        it(`should not update the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`Firebase DMs batch not available`));

          expect(updateMock).not.toHaveBeenCalled();
        });

        it(`should not commit the batch`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`Firebase DMs batch not available`));

          expect(commitMock).not.toHaveBeenCalled();
        });

        it(`should not notify that the Firebase DMs breaking changes are finished`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`Firebase DMs batch not available`));

          expect(notifyHasFinishedSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the batch is available`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceGetBatchSpy.mockReturnValue(writeBatch);
        });

        describe(`when there is no Firebase DM`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
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

            firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
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

        describe(`when there is a Firebase DM but on latest version`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDmVFinal>>({
              data: (): IFirebaseDmVFinal =>
                createMock<IFirebaseDmVFinal>({
                  version: FirebaseDmVersionEnum.V1,
                }),
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

            firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
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

          it(`should log that one DM is already up-to-date`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsBreakingChangeService`,
              message: `text-all Firebase DM hint-(1) up-to-date hint-(v1)`,
            } as ILoggerLog);
          });
        });

        describe(`when there is two Firebase DMs but on latest version`, (): void => {
          beforeEach((): void => {
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDmVFinal>>({
              data: (): IFirebaseDmVFinal =>
                createMock<IFirebaseDmVFinal>({
                  version: FirebaseDmVersionEnum.V1,
                }),
              exists: true,
            });
            forEachMock = jest
              .fn()
              .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                callback(queryDocumentSnapshot);
                callback(queryDocumentSnapshot);
              });
            querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
              forEach: forEachMock,
            });

            firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
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

          it(`should log that two DMs are already up-to-date`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsBreakingChangeService`,
              message: `text-all Firebase DMs hint-(2) up-to-date hint-(v1)`,
            } as ILoggerLog);
          });
        });

        // To un-skip when the version 2 will be out!
        describe.skip(`when there is a Firebase DM on version 1`, (): void => {
          let firebaseDmV1: IFirebaseDmV1;

          beforeEach((): void => {
            firebaseDmV1 = createMock<IFirebaseDmV1>({
              id: `dummy-id`,
              version: FirebaseDmVersionEnum.V1,
            });
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
              data: (): IFirebaseDmV1 => firebaseDmV1,
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

            firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
          });

          it(`should update the batch to update the DM to the latest version available`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(updateMock).toHaveBeenCalledTimes(1);
            expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
              id: `dummy-id`,
              lastReleaseNotesVersion: `0.0.0`,
              version: FirebaseDmVersionEnum.V1,
            } as IFirebaseDmVFinal);
          });

          it(`should commit the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(commitMock).toHaveBeenCalledTimes(1);
            expect(commitMock).toHaveBeenCalledWith();
          });

          it(`should log that one Firebase DM is updating`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsBreakingChangeService`,
              message: `text-updating value-1 Firebase DM...`,
            } as ILoggerLog);
          });
        });

        // To un-skip when the version 2 will be out!
        describe.skip(`when there is two Firebase DMs on version 1`, (): void => {
          let firebaseDmV1: IFirebaseDmV1;

          beforeEach((): void => {
            firebaseDmV1 = createMock<IFirebaseDmV1>({
              id: `dummy-id`,
              version: FirebaseDmVersionEnum.V1,
            });
            queryDocumentSnapshot = createMock<QueryDocumentSnapshot<IFirebaseDm>>({
              data: (): IFirebaseDmV1 => firebaseDmV1,
              exists: true,
            });
            forEachMock = jest
              .fn()
              .mockImplementation((callback: (result: QueryDocumentSnapshot<IFirebaseDm>) => void): void => {
                callback(queryDocumentSnapshot);
                callback(queryDocumentSnapshot);
              });
            querySnapshot = createMock<QuerySnapshot<IFirebaseDm>>({
              forEach: forEachMock,
            });

            firebaseDmsServiceGetDmsSpy.mockResolvedValue(querySnapshot);
          });

          it(`should update the batch to update the two DMs to the latest version available`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(updateMock).toHaveBeenCalledTimes(2);
            expect(updateMock).toHaveBeenCalledWith(queryDocumentSnapshot.ref, {
              id: `dummy-id`,
              lastReleaseNotesVersion: `0.0.0`,
              version: FirebaseDmVersionEnum.V1,
            } as IFirebaseDmVFinal);
          });

          it(`should commit the batch`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(commitMock).toHaveBeenCalledTimes(1);
            expect(commitMock).toHaveBeenCalledWith();
          });

          it(`should log that two Firebase DMs is updating`, async (): Promise<void> => {
            expect.assertions(2);

            await service.init();

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsBreakingChangeService`,
              message: `text-updating value-2 Firebase DMs...`,
            } as ILoggerLog);
          });
        });

        it(`should notify that the Firebase DMs breaking changes are finished`, async (): Promise<void> => {
          expect.assertions(2);

          await service.init();

          expect(notifyHasFinishedSpy).toHaveBeenCalledTimes(1);
          expect(notifyHasFinishedSpy).toHaveBeenCalledWith();
        });
      });
    });
  });

  describe(`hasFinished$()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseDmsBreakingChangeService();
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
      service = new FirebaseDmsBreakingChangeService();
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
      service = new FirebaseDmsBreakingChangeService();
    });

    it(`should notify that the Firebase DMs breaking changes were handled`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyHasFinished();

      const result = await firstValueFrom(service.hasFinished$().pipe(take(1)));

      expect(result).toBe(true);
    });
  });
});
