import { FirebaseDmsBreakingChangeService } from './dms/firebase-dms-breaking-change.service';
import { FirebaseDmsNewVersionService } from './dms/firebase-dms-new-version.service';
import { FirebaseDmsService } from './dms/firebase-dms.service';
import { FirebaseAppService } from './firebase-app.service';
import { FirebaseStoreService } from './firebase-store.service';
import { FirebaseService } from './firebase.service';
import { FirebaseGuildsBreakingChangeService } from './guilds/firebase-guilds-breaking-change.service';
import { FirebaseGuildsNewVersionService } from './guilds/firebase-guilds-new-version.service';
import { FirebaseGuildsService } from './guilds/firebase-guilds.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ILoggerLog } from '../../logger/interfaces/logger-log';
import { LoggerService } from '../../logger/services/logger.service';
import { FirebaseDmsStoreService } from '../stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../stores/guilds/services/firebase-guilds-store.service';
import { WriteResult } from 'firebase-admin/firestore';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`FirebaseService`, (): void => {
  let service: FirebaseService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let firebaseStoreService: FirebaseStoreService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseStoreService = FirebaseStoreService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Firebase service`, (): void => {
      expect.assertions(1);

      service = FirebaseService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseService));
    });

    it(`should return the created Firebase service`, (): void => {
      expect.assertions(1);

      const result = FirebaseService.getInstance();

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

    it(`should notify the Firebase service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.FIREBASE_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let firebaseAppService: FirebaseAppService;

    let firebaseAppServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseAppServiceGetInstanceInitSpy: jest.SpyInstance;
    let initGuildsSpy: jest.SpyInstance;
    let initDmsSpy: jest.SpyInstance;
    let firebaseStoreServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseStoreServiceGetInstanceInitSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseService();
      firebaseAppService = createMock<FirebaseAppService>();

      firebaseAppServiceGetInstanceSpy = jest
        .spyOn(FirebaseAppService, `getInstance`)
        .mockReturnValue(firebaseAppService);
      firebaseAppServiceGetInstanceInitSpy = jest.spyOn(firebaseAppService, `init`).mockImplementation();
      initGuildsSpy = jest.spyOn(service, `initGuilds`).mockResolvedValue([1, []]);
      initDmsSpy = jest.spyOn(service, `initDms`).mockResolvedValue([2, []]);
      firebaseStoreServiceGetInstanceSpy = jest
        .spyOn(FirebaseStoreService, `getInstance`)
        .mockReturnValue(firebaseStoreService);
      firebaseStoreServiceGetInstanceInitSpy = jest.spyOn(firebaseStoreService, `init`).mockResolvedValue(true);
    });

    it(`should create and initialize the FirebaseApp service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(firebaseAppServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseAppServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseAppServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseStore service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.init();

      expect(firebaseStoreServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseStoreServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseStoreServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should initialize the Firebase guilds`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(initGuildsSpy).toHaveBeenCalledTimes(1);
      expect(initGuildsSpy).toHaveBeenCalledWith();
    });

    it(`should initialize the Firebase DMs`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(initDmsSpy).toHaveBeenCalledTimes(1);
      expect(initDmsSpy).toHaveBeenCalledWith();
    });

    it(`should return the promises from the Firebase stores`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.init();

      expect(result).toBeUndefined();
    });
  });

  describe(`initGuilds()`, (): void => {
    let firebaseGuildsService: FirebaseGuildsService;
    let firebaseGuildsNewVersionService: FirebaseGuildsNewVersionService;
    let firebaseGuildsStoreService: FirebaseGuildsStoreService;
    let firebaseGuildsBreakingChangeService: FirebaseGuildsBreakingChangeService;

    let firebaseGuildsServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetInstanceWatchGuildsSpy: jest.SpyInstance;
    let firebaseGuildsNewVersionServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseGuildsNewVersionServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseGuildsStoreServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseGuildsStoreServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseGuildsBreakingChangeServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseGuildsBreakingChangeServiceGetInstanceInitSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseService();
      firebaseGuildsService = createMock<FirebaseGuildsService>();
      firebaseGuildsNewVersionService = createMock<FirebaseGuildsNewVersionService>();
      firebaseGuildsStoreService = createMock<FirebaseGuildsStoreService>();
      firebaseGuildsBreakingChangeService = createMock<FirebaseGuildsBreakingChangeService>();

      firebaseGuildsServiceGetInstanceSpy = jest
        .spyOn(FirebaseGuildsService, `getInstance`)
        .mockReturnValue(firebaseGuildsService);
      firebaseGuildsServiceGetInstanceInitSpy = jest.spyOn(firebaseGuildsService, `init`).mockResolvedValue(undefined);
      firebaseGuildsServiceGetInstanceWatchGuildsSpy = jest
        .spyOn(firebaseGuildsService, `watchGuilds`)
        .mockImplementation();
      firebaseGuildsNewVersionServiceGetInstanceSpy = jest
        .spyOn(FirebaseGuildsNewVersionService, `getInstance`)
        .mockReturnValue(firebaseGuildsNewVersionService);
      firebaseGuildsNewVersionServiceGetInstanceInitSpy = jest
        .spyOn(firebaseGuildsNewVersionService, `init`)
        .mockImplementation();
      firebaseGuildsStoreServiceGetInstanceSpy = jest
        .spyOn(FirebaseGuildsStoreService, `getInstance`)
        .mockReturnValue(firebaseGuildsStoreService);
      firebaseGuildsStoreServiceGetInstanceInitSpy = jest
        .spyOn(firebaseGuildsStoreService, `init`)
        .mockImplementation();
      firebaseGuildsBreakingChangeServiceGetInstanceSpy = jest
        .spyOn(FirebaseGuildsBreakingChangeService, `getInstance`)
        .mockReturnValue(firebaseGuildsBreakingChangeService);
      firebaseGuildsBreakingChangeServiceGetInstanceInitSpy = jest
        .spyOn(firebaseGuildsBreakingChangeService, `init`)
        .mockResolvedValue();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should create the FirebaseGuilds service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initGuilds();

      expect(firebaseGuildsServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseGuilds service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initGuilds();

      expect(firebaseGuildsServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseGuildsServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    describe(`when the FirebaseGuilds service failed to initialize`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceGetInstanceInitSpy.mockRejectedValue(new Error(`init error`));
      });

      it(`should log about the init error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.initGuilds()).rejects.toThrow(new Error(`init error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseService`,
          message: `text-FirebaseGuildsService init failed`,
        } as ILoggerLog);
      });
    });

    it(`should create the FirebaseGuildsNewVersion service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initGuilds();

      expect(firebaseGuildsNewVersionServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseGuildsNewVersion service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initGuilds();

      expect(firebaseGuildsNewVersionServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseGuildsNewVersionServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsNewVersionServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create the FirebaseGuildsStore service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initGuilds();

      expect(firebaseGuildsStoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseGuildsStore service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initGuilds();

      expect(firebaseGuildsStoreServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseGuildsStoreServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsStoreServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create the FirebaseGuildsBreakingChange service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initGuilds();

      expect(firebaseGuildsBreakingChangeServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseGuildsBreakingChange service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initGuilds();

      expect(firebaseGuildsBreakingChangeServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseGuildsBreakingChangeServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsBreakingChangeServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    describe(`when the FirebaseGuildsBreakingChange service failed to be initialized`, (): void => {
      beforeEach((): void => {
        firebaseGuildsBreakingChangeServiceGetInstanceInitSpy.mockRejectedValue(new Error(`init error`));
      });

      it(`should not watch the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.initGuilds()).rejects.toThrow(new Error(`init error`));

        expect(firebaseGuildsServiceGetInstanceWatchGuildsSpy).not.toHaveBeenCalled();
      });

      it(`should log about the init error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.initGuilds()).rejects.toThrow(new Error(`init error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseService`,
          message: `text-FirebaseGuildsBreakingChangeService init failed`,
        } as ILoggerLog);
      });
    });

    describe(`when the FirebaseGuildsBreakingChange service was successfully initialized`, (): void => {
      let writeResult: WriteResult;

      beforeEach((): void => {
        writeResult = createMock<WriteResult>();

        firebaseGuildsBreakingChangeServiceGetInstanceInitSpy.mockResolvedValue(writeResult);
      });

      it(`should watch the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await service.initGuilds();

        expect(firebaseGuildsServiceGetInstanceWatchGuildsSpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsServiceGetInstanceWatchGuildsSpy).toHaveBeenCalledWith();
      });
    });
  });

  describe(`initDms()`, (): void => {
    let firebaseDmsService: FirebaseDmsService;
    let firebaseDmsNewVersionService: FirebaseDmsNewVersionService;
    let firebaseDmsStoreService: FirebaseDmsStoreService;
    let firebaseDmsBreakingChangeService: FirebaseDmsBreakingChangeService;

    let firebaseDmsServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseDmsServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseDmsServiceGetInstanceWatchDmsSpy: jest.SpyInstance;
    let firebaseDmsNewVersionServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseDmsNewVersionServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseDmsStoreServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseDmsStoreServiceGetInstanceInitSpy: jest.SpyInstance;
    let firebaseDmsBreakingChangeServiceGetInstanceSpy: jest.SpyInstance;
    let firebaseDmsBreakingChangeServiceGetInstanceInitSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseService();
      firebaseDmsService = createMock<FirebaseDmsService>();
      firebaseDmsNewVersionService = createMock<FirebaseDmsNewVersionService>();
      firebaseDmsStoreService = createMock<FirebaseDmsStoreService>();
      firebaseDmsBreakingChangeService = createMock<FirebaseDmsBreakingChangeService>();

      firebaseDmsServiceGetInstanceSpy = jest
        .spyOn(FirebaseDmsService, `getInstance`)
        .mockReturnValue(firebaseDmsService);
      firebaseDmsServiceGetInstanceInitSpy = jest.spyOn(firebaseDmsService, `init`).mockResolvedValue(undefined);
      firebaseDmsServiceGetInstanceWatchDmsSpy = jest.spyOn(firebaseDmsService, `watchDms`).mockImplementation();
      firebaseDmsNewVersionServiceGetInstanceSpy = jest
        .spyOn(FirebaseDmsNewVersionService, `getInstance`)
        .mockReturnValue(firebaseDmsNewVersionService);
      firebaseDmsNewVersionServiceGetInstanceInitSpy = jest
        .spyOn(firebaseDmsNewVersionService, `init`)
        .mockImplementation();
      firebaseDmsStoreServiceGetInstanceSpy = jest
        .spyOn(FirebaseDmsStoreService, `getInstance`)
        .mockReturnValue(firebaseDmsStoreService);
      firebaseDmsStoreServiceGetInstanceInitSpy = jest.spyOn(firebaseDmsStoreService, `init`).mockImplementation();
      firebaseDmsBreakingChangeServiceGetInstanceSpy = jest
        .spyOn(FirebaseDmsBreakingChangeService, `getInstance`)
        .mockReturnValue(firebaseDmsBreakingChangeService);
      firebaseDmsBreakingChangeServiceGetInstanceInitSpy = jest
        .spyOn(firebaseDmsBreakingChangeService, `init`)
        .mockResolvedValue();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should create the FirebaseDms service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initDms();

      expect(firebaseDmsServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseDms service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initDms();

      expect(firebaseDmsServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseDmsServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    describe(`when the FirebaseDms service failed to initialize`, (): void => {
      beforeEach((): void => {
        firebaseDmsServiceGetInstanceInitSpy.mockRejectedValue(new Error(`init error`));
      });

      it(`should log about the init error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.initDms()).rejects.toThrow(new Error(`init error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseService`,
          message: `text-FirebaseDmsService init failed`,
        } as ILoggerLog);
      });
    });

    it(`should create the FirebaseDmsNewVersion service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initDms();

      expect(firebaseDmsNewVersionServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseDmsNewVersion service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initDms();

      expect(firebaseDmsNewVersionServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseDmsNewVersionServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsNewVersionServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create the FirebaseDmsStore service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initDms();

      expect(firebaseDmsStoreServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseDmsStore service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initDms();

      expect(firebaseDmsStoreServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseDmsStoreServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsStoreServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    it(`should create the FirebaseDmsBreakingChange service`, async (): Promise<void> => {
      expect.assertions(1);

      await service.initDms();

      expect(firebaseDmsBreakingChangeServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create and initialize the FirebaseDmsBreakingChange service`, async (): Promise<void> => {
      expect.assertions(3);

      await service.initDms();

      expect(firebaseDmsBreakingChangeServiceGetInstanceSpy).toHaveBeenCalledWith();
      expect(firebaseDmsBreakingChangeServiceGetInstanceInitSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsBreakingChangeServiceGetInstanceInitSpy).toHaveBeenCalledWith();
    });

    describe(`when the FirebaseDmsBreakingChange service failed to be initialized`, (): void => {
      beforeEach((): void => {
        firebaseDmsBreakingChangeServiceGetInstanceInitSpy.mockRejectedValue(new Error(`init error`));
      });

      it(`should not watch the Firebase DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.initDms()).rejects.toThrow(new Error(`init error`));

        expect(firebaseDmsServiceGetInstanceWatchDmsSpy).not.toHaveBeenCalled();
      });

      it(`should log about the init error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.initDms()).rejects.toThrow(new Error(`init error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseService`,
          message: `text-FirebaseDmsBreakingChangeService init failed`,
        } as ILoggerLog);
      });
    });

    describe(`when the FirebaseDmsBreakingChange service was successfully initialized`, (): void => {
      let writeResult: WriteResult;

      beforeEach((): void => {
        writeResult = createMock<WriteResult>();

        firebaseDmsBreakingChangeServiceGetInstanceInitSpy.mockResolvedValue(writeResult);
      });

      it(`should watch the Firebase DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await service.initDms();

        expect(firebaseDmsServiceGetInstanceWatchDmsSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsServiceGetInstanceWatchDmsSpy).toHaveBeenCalledWith();
      });
    });
  });
});
