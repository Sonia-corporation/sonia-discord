import { FirebaseAppService } from './firebase-app.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ILoggerLog } from '../../logger/interfaces/logger-log';
import { LoggerService } from '../../logger/services/logger.service';
import { FirebaseAppEnum } from '../enums/firebase-app.enum';
import * as admin from 'firebase-admin';
import { createMock } from 'ts-auto-mock';
import App = admin.app.App;

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseAppService`, (): void => {
  let service: FirebaseAppService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseApp service`, (): void => {
      expect.assertions(1);

      service = FirebaseAppService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseAppService));
    });

    it(`should return the created FirebaseApp service`, (): void => {
      expect.assertions(1);

      const result = FirebaseAppService.getInstance();

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

    it(`should notify the FirebaseApp service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseAppService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_APP_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let credential: admin.credential.Credential;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let initializeAppSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseAppService();

      credential = createMock<admin.credential.Credential>();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      initializeAppSpy = jest.spyOn(admin, `initializeApp`).mockImplementation();
      jest.spyOn(admin.credential, `applicationDefault`).mockReturnValue(credential);
    });

    it(`should log about the creation of the Firebase app`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `FirebaseAppService`,
        message: `text-creating app...`,
      } as ILoggerLog);
    });

    it(`should create the Firebase app`, (): void => {
      expect.assertions(2);

      service.init();

      expect(initializeAppSpy).toHaveBeenCalledTimes(1);
      expect(initializeAppSpy).toHaveBeenCalledWith(
        {
          credential,
          databaseURL: `https://sonia-discord-api.firebaseio.com`,
        },
        FirebaseAppEnum.SONIA_DISCORD
      );
    });

    it(`should log about the success of the creation of the Firebase app`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `FirebaseAppService`,
        message: `text-app created`,
      } as ILoggerLog);
    });
  });

  describe(`getApp()`, (): void => {
    let app: App;

    beforeEach((): void => {
      service = new FirebaseAppService();
      app = createMock<App>();

      jest.spyOn(admin, `initializeApp`).mockReturnValue(app);
    });

    describe(`when the app is undefined`, (): void => {
      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = service.getApp();

        expect(result).toBeUndefined();
      });
    });

    describe(`when the app is valid`, (): void => {
      beforeEach((): void => {
        service = new FirebaseAppService();

        service.init();
      });

      it(`should return the app`, (): void => {
        expect.assertions(1);

        const result = service.getApp();

        expect(result).toStrictEqual(app);
      });
    });
  });
});
