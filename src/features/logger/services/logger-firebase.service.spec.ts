import { LoggerFirebaseService } from './logger-firebase.service';
import { LoggerService } from './logger.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ILoggerLog } from '../interfaces/logger-log';
import { Guild } from 'discord.js';

jest.mock(`./chalk/chalk.service`);

describe(`LoggerFirebaseService`, (): void => {
  let service: LoggerFirebaseService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a LoggerFirebase service`, (): void => {
      expect.assertions(1);

      service = LoggerFirebaseService.getInstance();

      expect(service).toStrictEqual(expect.any(LoggerFirebaseService));
    });

    it(`should return the created LoggerFirebase service`, (): void => {
      expect.assertions(1);

      const result = LoggerFirebaseService.getInstance();

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

    it(`should notify the LoggerFirebase service creation`, (): void => {
      expect.assertions(2);

      service = new LoggerFirebaseService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.LOGGER_FIREBASE_SERVICE);
    });
  });

  describe(`logFetchingGuild()`, (): void => {
    let serviceName: ServiceNameEnum;
    let guildId: Guild['id'];

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new LoggerFirebaseService();
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
      guildId = `dummy-guild-id`;

      loggerServiceDebugSpy = loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    it(`should log that the given guild is being fetched from Firebase`, (): void => {
      expect.assertions(2);

      service.logFetchingGuild(serviceName, guildId);

      const loggerLog: ILoggerLog = {
        context: `AppConfigCoreService`,
        message: `text-fetching Firebase guild value-dummy-guild-id`,
      };
      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith(loggerLog);
    });
  });

  describe(`logGuildsToUpdateCount()`, (): void => {
    let serviceName: ServiceNameEnum;
    let countFirebaseGuildsUpdated: number;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new LoggerFirebaseService();
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;

      loggerServiceLogSpy = loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
    });

    describe(`when there is one Firebase guild to update`, (): void => {
      beforeEach((): void => {
        countFirebaseGuildsUpdated = 1;
      });

      it(`should log the count of Firebase guilds to update (singular)`, (): void => {
        expect.assertions(2);

        service.logGuildsToUpdateCount(serviceName, countFirebaseGuildsUpdated);

        const loggerLog: ILoggerLog = {
          context: `AppConfigCoreService`,
          message: `text-updating value-1 Firebase guild...`,
        };
        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith(loggerLog);
      });
    });

    describe(`when there is multiple Firebase guilds to update`, (): void => {
      beforeEach((): void => {
        countFirebaseGuildsUpdated = 2;
      });

      it(`should log the count of Firebase guilds to update (plural)`, (): void => {
        expect.assertions(2);

        service.logGuildsToUpdateCount(serviceName, countFirebaseGuildsUpdated);

        const loggerLog: ILoggerLog = {
          context: `AppConfigCoreService`,
          message: `text-updating value-2 Firebase guilds...`,
        };
        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith(loggerLog);
      });
    });
  });
});
