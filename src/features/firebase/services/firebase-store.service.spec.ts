import { FirebaseAppService } from './firebase-app.service';
import { FirebaseStoreService } from './firebase-store.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { DiscordClientService } from '../../discord/services/discord-client.service';
import { ILoggerLog } from '../../logger/interfaces/logger-log';
import { LoggerService } from '../../logger/services/logger.service';
import { App } from 'firebase-admin/app';
import * as FirebaseAdminFirestoreModule from 'firebase-admin/firestore';
import { Firestore } from 'firebase-admin/firestore';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`FirebaseStoreService`, (): void => {
  let service: FirebaseStoreService;
  let coreEventService: CoreEventService;
  let firebaseAppService: FirebaseAppService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseAppService = FirebaseAppService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseStore service`, (): void => {
      expect.assertions(1);

      service = FirebaseStoreService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseStoreService));
    });

    it(`should return the created FirebaseStore service`, (): void => {
      expect.assertions(1);

      const result = FirebaseStoreService.getInstance();

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

    it(`should notify the FirebaseStore service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseStoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_STORE_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let app: App;

    let discordClientServiceIsReadySpy: jest.SpyInstance;
    let firebaseAppServiceGetAppSpy: jest.SpyInstance;
    let getFirestoreSpy: jest.SpyInstance;
    let notifyIsReadySpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let settingsMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseStoreService();
      app = createMock<App>();
      settingsMock = jest.fn();

      discordClientServiceIsReadySpy = jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
      firebaseAppServiceGetAppSpy = jest.spyOn(firebaseAppService, `getApp`).mockReturnValue(app);
      getFirestoreSpy = jest.spyOn(FirebaseAdminFirestoreModule, `getFirestore`).mockReturnValue(
        createMock<Firestore>({
          settings: settingsMock,
        })
      );
      notifyIsReadySpy = jest.spyOn(service, `notifyIsReady`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
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

        expect(getFirestoreSpy).not.toHaveBeenCalled();
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

      describe(`when the app is unset`, (): void => {
        beforeEach((): void => {
          firebaseAppServiceGetAppSpy = jest.spyOn(firebaseAppService, `getApp`).mockReturnValue(undefined);
        });

        it(`should log an error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.init()).rejects.toThrow(new Error(`app is unset`));

          const loggerLog: ILoggerLog = {
            context: `FirebaseStoreService`,
            message: `text-app is unset`,
          };
          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith(loggerLog);
        });

        it(`should throw`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.init()).rejects.toThrow(new Error(`app is unset`));
        });

        it(`should not create the store`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`app is unset`));

          expect(getFirestoreSpy).not.toHaveBeenCalled();
        });

        it(`should not configure the store`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`app is unset`));

          expect(settingsMock).not.toHaveBeenCalled();
        });

        it(`should not notify that the Firebase app is ready`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.init()).rejects.toThrow(new Error(`app is unset`));

          expect(notifyIsReadySpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the app is set`, (): void => {
        beforeEach((): void => {
          firebaseAppServiceGetAppSpy = jest.spyOn(firebaseAppService, `getApp`).mockReturnValue(app);
        });

        it(`should create the store`, async (): Promise<void> => {
          expect.assertions(2);

          await service.init();

          expect(getFirestoreSpy).toHaveBeenCalledTimes(1);
          expect(getFirestoreSpy).toHaveBeenCalledWith(app);
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
      });
    });
  });

  describe(`isReady$()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseStoreService();
    });

    it(`should be false by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await firstValueFrom(service.isReady$().pipe(take(1)));

      expect(result).toBe(false);
    });

    describe(`when the is ready event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsReady();

        const result = await firstValueFrom(service.isReady$().pipe(take(1)));

        expect(result).toBe(true);
      });
    });
  });

  describe(`isReady()`, (): void => {
    beforeEach((): void => {
      service = new FirebaseStoreService();
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
      service = new FirebaseStoreService();
    });

    it(`should notify that the Firebase app is ready`, async (): Promise<void> => {
      expect.assertions(1);

      service.notifyIsReady();
      const result = await firstValueFrom(service.isReady$().pipe(take(1)));

      expect(result).toBe(true);
    });
  });
});
