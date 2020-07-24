import * as FirebaseAdminModule from "firebase-admin";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseAppEnum } from "../enums/firebase-app.enum";
import { FirebaseAppService } from "./firebase-app.service";

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
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_APP_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let credential: FirebaseAdminModule.credential.Credential;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let initializeAppSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseAppService();
      process.env.GOOGLE_APPLICATION_CREDENTIALS = `dummy-google-application-credentials`;
      credential = createMock<FirebaseAdminModule.credential.Credential>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      initializeAppSpy = jest
        .spyOn(FirebaseAdminModule, `initializeApp`)
        .mockImplementation();
      jest
        .spyOn(FirebaseAdminModule.credential, `applicationDefault`)
        .mockReturnValue(credential);
    });

    it(`should log the Google application credential environment variable`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `FirebaseAppService`,
        message: `text-GOOGLE_APPLICATION_CREDENTIALS env: value-dummy-google-application-credentials`,
      } as ILoggerLog);
    });

    it(`should log about the creation of the Firebase app`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
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
          databaseURL: `https://sonia-il-est-midi-discord-api.firebaseio.com`,
        },
        FirebaseAppEnum.SONIA_IL_EST_MIDI_DISCORD
      );
    });

    it(`should log about the success of the creation of the Firebase app`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
        context: `FirebaseAppService`,
        message: `text-app created`,
      } as ILoggerLog);
    });
  });
});
