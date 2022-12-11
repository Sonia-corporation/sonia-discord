import { LoggerDiscordService } from './logger-discord.service';
import { LoggerService } from './logger.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { IFirebaseGuildChannel } from '../../firebase/types/guilds/channels/firebase-guild-channel';
import { ILoggerLog } from '../interfaces/logger-log';
import { Guild } from 'discord.js';

jest.mock(`./chalk/chalk.service`);

describe(`LoggerDiscordService`, (): void => {
  let service: LoggerDiscordService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a LoggerDiscord service`, (): void => {
      expect.assertions(1);

      service = LoggerDiscordService.getInstance();

      expect(service).toStrictEqual(expect.any(LoggerDiscordService));
    });

    it(`should return the created LoggerDiscord service`, (): void => {
      expect.assertions(1);

      const result = LoggerDiscordService.getInstance();

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

    it(`should notify the LoggerDiscord service creation`, (): void => {
      expect.assertions(2);

      service = new LoggerDiscordService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.LOGGER_DISCORD_SERVICE);
    });
  });

  describe(`logValidGuildChannel()`, (): void => {
    let serviceName: ServiceNameEnum;
    let guildId: Guild['id'];
    let guildChannelId: IFirebaseGuildChannel['id'];

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new LoggerDiscordService();
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
      guildId = `dummy-guild-id`;
      guildChannelId = `dummy-guild-channel-id`;

      loggerServiceDebugSpy = loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    it(`should log that the given guild has a valid channel`, (): void => {
      expect.assertions(2);

      service.logValidGuildChannel(serviceName, guildId, guildChannelId);

      const loggerLog: ILoggerLog = {
        context: `AppConfigCoreService`,
        message: `text-Discord guild value-dummy-guild-id channel value-dummy-guild-channel-id is valid`,
      };
      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith(loggerLog);
    });
  });

  describe(`logInValidGuildChannel()`, (): void => {
    let serviceName: ServiceNameEnum;
    let guildId: Guild['id'];
    let guildChannelId: IFirebaseGuildChannel['id'];

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new LoggerDiscordService();
      serviceName = ServiceNameEnum.APP_CONFIG_CORE_SERVICE;
      guildId = `dummy-guild-id`;
      guildChannelId = `dummy-guild-channel-id`;

      loggerServiceDebugSpy = loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    it(`should log that the given guild has an invalid channel`, (): void => {
      expect.assertions(2);

      service.logInValidGuildChannel(serviceName, guildId, guildChannelId);

      const loggerLog: ILoggerLog = {
        context: `AppConfigCoreService`,
        message: `text-Discord guild value-dummy-guild-id channel value-dummy-guild-channel-id is invalid`,
      };
      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith(loggerLog);
    });
  });
});
