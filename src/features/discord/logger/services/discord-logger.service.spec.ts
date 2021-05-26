import { DiscordLoggerErrorService } from './discord-logger-error.service';
import { DiscordLoggerWarningService } from './discord-logger-warning.service';
import { DiscordLoggerService } from './discord-logger.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { Client } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordLoggerService`, (): void => {
  let service: DiscordLoggerService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordClientService: DiscordClientService;
  let discordLoggerWarningService: DiscordLoggerWarningService;
  let discordLoggerErrorService: DiscordLoggerErrorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    discordLoggerWarningService = DiscordLoggerWarningService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordLogger service`, (): void => {
      expect.assertions(1);

      service = DiscordLoggerService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordLoggerService));
    });

    it(`should return the created DiscordLogger service`, (): void => {
      expect.assertions(1);

      const result = DiscordLoggerService.getInstance();

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

    it(`should notify the DiscordLogger service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordLoggerService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_LOGGER_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let client: Client;
    let discordClientServiceGetClientOnMock: jest.Mock;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let discordLoggerWarningServiceHandleWarningSpy: jest.SpyInstance;
    let discordLoggerErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordLoggerService();
      discordClientServiceGetClientOnMock = jest.fn();
      client = createHydratedMock<Client>({
        on: discordClientServiceGetClientOnMock,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(client);
      discordLoggerWarningServiceHandleWarningSpy = jest
        .spyOn(discordLoggerWarningService, `handleWarning`)
        .mockImplementation();
      discordLoggerErrorServiceHandleErrorSpy = jest
        .spyOn(discordLoggerErrorService, `handleError`)
        .mockImplementation();
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(3);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(2);
      expect(discordClientServiceGetClientSpy).toHaveBeenNthCalledWith(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenNthCalledWith(2);
    });

    it(`should listen for the Discord client warn event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(2);
      expect(discordClientServiceGetClientOnMock).toHaveBeenNthCalledWith(1, `warn`, expect.any(Function));
    });

    describe(`when the Discord client warn event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn((_event: string, listener: () => void): void => {
          listener();
        });
        client = createHydratedMock<Client>({
          on: discordClientServiceGetClientOnMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should handle the warning`, (): void => {
        expect.assertions(2);

        service.init();

        expect(discordLoggerWarningServiceHandleWarningSpy).toHaveBeenCalledTimes(1);
        expect(discordLoggerWarningServiceHandleWarningSpy).toHaveBeenCalledWith(undefined);
      });
    });

    it(`should log about listening Discord warn event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `DiscordLoggerService`,
        message: `text-listen "warn" event`,
      } as ILoggerLog);
    });

    it(`should listen for the Discord client error event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(2);
      expect(discordClientServiceGetClientOnMock).toHaveBeenNthCalledWith(2, `error`, expect.any(Function));
    });

    describe(`when the Discord client error event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn((_event: string, listener: () => void): void => {
          listener();
        });
        client = createHydratedMock<Client>({
          on: discordClientServiceGetClientOnMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should handle the error`, (): void => {
        expect.assertions(2);

        service.init();

        expect(discordLoggerErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
        expect(discordLoggerErrorServiceHandleErrorSpy).toHaveBeenCalledWith(undefined);
      });
    });

    it(`should log about listening Discord error event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `DiscordLoggerService`,
        message: `text-listen "error" event`,
      } as ILoggerLog);
    });
  });
});
