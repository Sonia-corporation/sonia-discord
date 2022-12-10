import { DiscordDmFirebaseService } from './discord-dm-firebase.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { FirebaseDmsService } from '../../../firebase/services/dms/firebase-dms.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordMessageErrorService } from '../../messages/services/helpers/discord-message-error.service';
import { IAnyDiscordMessage } from '../../messages/types/any-discord-message';
import { WriteResult } from 'firebase-admin/firestore';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordDmFirebaseService`, (): void => {
  let service: DiscordDmFirebaseService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordMessageErrorService: DiscordMessageErrorService;
  let firebaseDmsService: FirebaseDmsService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
    firebaseDmsService = FirebaseDmsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordDmFirebase service`, (): void => {
      expect.assertions(1);

      service = DiscordDmFirebaseService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordDmFirebaseService));
    });

    it(`should return the created DiscordDmFirebase service`, (): void => {
      expect.assertions(1);

      const result = DiscordDmFirebaseService.getInstance();

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

    it(`should notify the DiscordDmFirebase service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordDmFirebaseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_DM_FIREBASE_SERVICE);
    });
  });

  describe(`addDmToFirebase()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;
    let firebaseDmsServiceHasDmSpy: jest.SpyInstance;
    let firebaseDmsServiceAddDmSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordDmFirebaseService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-message-id`,
      });

      discordMessageErrorServiceHandleErrorSpy = jest
        .spyOn(discordMessageErrorService, `handleError`)
        .mockImplementation();
      firebaseDmsServiceHasDmSpy = jest.spyOn(firebaseDmsService, `hasDm`).mockRejectedValue(new Error(`hasDm error`));
      firebaseDmsServiceAddDmSpy = jest.spyOn(firebaseDmsService, `addDm`).mockRejectedValue(new Error(`addDm error`));
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceSuccessSpy = jest.spyOn(loggerService, `success`).mockImplementation();
    });

    describe(`when the given discord message has no author`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          author: null,
        });
      });

      it(`should handle it as an error`, async (): Promise<void> => {
        expect.assertions(2);

        await service.addDmToFirebase(anyDiscordMessage);

        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
          new Error(`The author should exist!`),
          anyDiscordMessage,
          `could not register the author into the DM Firestore`
        );
      });

      it(`should return void`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.addDmToFirebase(anyDiscordMessage);

        expect(result).toBeUndefined();
      });
    });

    describe(`when the given discord message has an author`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          author: {
            id: `dummy-author-id`,
          },
          id: `dummy-message-id`,
        });
      });

      it(`should check if the author is already registered in the Firestore DM`, async (): Promise<void> => {
        expect.assertions(2);

        await service.addDmToFirebase(anyDiscordMessage);

        expect(firebaseDmsServiceHasDmSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsServiceHasDmSpy).toHaveBeenCalledWith(`dummy-author-id`);
      });

      describe(`when an error occurred while checking`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceHasDmSpy.mockRejectedValue(new Error(`hasDm error`));
        });

        it(`should handle the error`, async (): Promise<void> => {
          expect.assertions(2);

          await service.addDmToFirebase(anyDiscordMessage);

          expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
            new Error(`hasDm error`),
            anyDiscordMessage,
            `could not register the author into the DM Firestore`
          );
        });

        it(`should return void`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.addDmToFirebase(anyDiscordMessage);

          expect(result).toBeUndefined();
        });
      });

      describe(`when the check was successful`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceHasDmSpy.mockResolvedValue(false);
        });

        describe(`when the DM is already existing for this author`, (): void => {
          beforeEach((): void => {
            firebaseDmsServiceHasDmSpy.mockResolvedValue(true);
          });

          it(`should log the author being already registered in the Firestore DM`, async (): Promise<void> => {
            expect.assertions(2);

            await service.addDmToFirebase(anyDiscordMessage);

            const loggerLog: ILoggerLog = {
              context: `DiscordDmFirebaseService`,
              hasExtendedContext: true,
              message: `context-[dummy-message-id] text-Firestore DM already created for the user value-dummy-author-id`,
            };
            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith(loggerLog);
          });

          it(`should return void`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.addDmToFirebase(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the DM is not yet existing for this author`, (): void => {
          beforeEach((): void => {
            firebaseDmsServiceHasDmSpy.mockResolvedValue(false);
          });

          it(`should create a new DM for this author in Firestore`, async (): Promise<void> => {
            expect.assertions(2);

            await service.addDmToFirebase(anyDiscordMessage);

            expect(firebaseDmsServiceAddDmSpy).toHaveBeenCalledTimes(1);
            expect(firebaseDmsServiceAddDmSpy).toHaveBeenCalledWith(`dummy-author-id`);
          });

          describe(`when the creation of the DM failed`, (): void => {
            beforeEach((): void => {
              firebaseDmsServiceAddDmSpy.mockRejectedValue(new Error(`addDm error`));
            });

            it(`should handle the error`, async (): Promise<void> => {
              expect.assertions(2);

              await service.addDmToFirebase(anyDiscordMessage);

              expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
              expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
                new Error(`addDm error`),
                anyDiscordMessage,
                `could not add the DM into the Firestore`
              );
            });

            it(`should return void`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.addDmToFirebase(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the creation of the DM succeeded`, (): void => {
            let writeResult: WriteResult;

            beforeEach((): void => {
              writeResult = createHydratedMock<WriteResult>();

              firebaseDmsServiceAddDmSpy.mockResolvedValue(writeResult);
            });

            it(`should log about the success`, async (): Promise<void> => {
              expect.assertions(2);

              await service.addDmToFirebase(anyDiscordMessage);

              const loggerLog: ILoggerLog = {
                context: `DiscordDmFirebaseService`,
                hasExtendedContext: true,
                message: `context-[dummy-message-id] text-DM value-dummy-author-id added into the Firestore`,
              };
              expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceSuccessSpy).toHaveBeenCalledWith(loggerLog);
            });

            it(`should return the write result`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.addDmToFirebase(anyDiscordMessage);

              expect(result).toStrictEqual(writeResult);
            });
          });
        });
      });
    });
  });
});
