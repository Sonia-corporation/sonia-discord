import { DiscordAuthenticationService } from './discord-authentication.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { DiscordSoniaConfigService } from '../../users/services/config/discord-sonia-config.service';
import { Client } from 'discord.js';
import { take } from 'rxjs/operators';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordAuthenticationService`, (): void => {
  let service: DiscordAuthenticationService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;
  let discordSoniaConfigService: DiscordSoniaConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordAuthentication service`, (): void => {
      expect.assertions(1);

      service = DiscordAuthenticationService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordAuthenticationService));
    });

    it(`should return the created DiscordAuthentication service`, (): void => {
      expect.assertions(1);

      const result = DiscordAuthenticationService.getInstance();

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

    it(`should notify the DiscordAuthentication service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordAuthenticationService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_AUTHENTICATION_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let client: Client;
    let discordClientServiceGetClientOnMock: jest.Mock;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let loginSpy: jest.SpyInstance;
    let discordClientServiceNotifyIsReadySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordAuthenticationService();
      discordClientServiceGetClientOnMock = jest.fn();
      client = createHydratedMock<Client>({
        on: discordClientServiceGetClientOnMock,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceLogSpy = jest.spyOn(loggerService, `log`).mockImplementation();
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(client);
      loginSpy = jest.spyOn(service, `login`).mockImplementation();
      discordClientServiceNotifyIsReadySpy = jest.spyOn(discordClientService, `notifyIsReady`).mockImplementation();
    });

    it(`should get the Discord client`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should listen for the Discord client ready event`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledWith(`ready`, expect.any(Function));
    });

    describe(`when the Discord client ready event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn((_event: string, listener: () => void): void => {
          listener();
        });
        client = createHydratedMock<Client>({
          on: discordClientServiceGetClientOnMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should get the Discord client`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(2);
        expect(discordClientServiceGetClientSpy).toHaveBeenNthCalledWith(2);
      });

      describe(`when the Discord client user is null`, (): void => {
        beforeEach((): void => {
          client = createHydratedMock<Client>({
            on: discordClientServiceGetClientOnMock,
            user: null,
          });

          discordClientServiceGetClientSpy.mockReturnValue(client);
        });

        it(`should log about the unknown user authentication`, async (): Promise<void> => {
          expect.assertions(2);

          await service.init();

          expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceLogSpy).toHaveBeenCalledWith({
            context: `DiscordAuthenticationService`,
            message: `text-authenticated as: value-unknown user`,
          } as ILoggerLog);
        });
      });

      describe(`when the Discord client user is valid`, (): void => {
        let tag: string;

        beforeEach((): void => {
          tag = `dummy-tag`;
          client = createHydratedMock<Client>({
            on: discordClientServiceGetClientOnMock,
            user: {
              tag,
            },
          });

          discordClientServiceGetClientSpy.mockReturnValue(client);
        });

        it(`should log about the unknown user authentication`, async (): Promise<void> => {
          expect.assertions(2);

          await service.init();

          expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceLogSpy).toHaveBeenCalledWith({
            context: `DiscordAuthenticationService`,
            message: `text-authenticated as: value-"dummy-tag"`,
          } as ILoggerLog);
        });
      });

      it(`should notify that the Discord client is ready`, async (): Promise<void> => {
        expect.assertions(2);

        await service.init();

        expect(discordClientServiceNotifyIsReadySpy).toHaveBeenCalledTimes(1);
        expect(discordClientServiceNotifyIsReadySpy).toHaveBeenCalledWith();
      });
    });

    it(`should log about listening Discord ready event`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordAuthenticationService`,
        message: `text-listen "ready" event`,
      } as ILoggerLog);
    });

    it(`should login`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(loginSpy).toHaveBeenCalledWith();
    });
  });

  describe(`login()`, (): void => {
    let client: Client;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let discordSoniaConfigServiceGetSecretTokenSpy: jest.SpyInstance;
    let notifyIsAuthenticatedSpy: jest.SpyInstance;
    let loginMock: jest.Mock;

    beforeEach((): void => {
      loginMock = jest.fn().mockResolvedValue(`login`);
      client = createHydratedMock<Client>({
        login: loginMock,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceSuccessSpy = jest.spyOn(loggerService, `success`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(client);
      discordSoniaConfigServiceGetSecretTokenSpy = jest
        .spyOn(discordSoniaConfigService, `getSecretToken`)
        .mockImplementation();
      notifyIsAuthenticatedSpy = jest.spyOn(service, `notifyIsAuthenticated`).mockImplementation();
    });

    it(`should log about the authentication`, async (): Promise<void> => {
      expect.assertions(2);

      await service.login();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordAuthenticationService`,
        message: `text-authenticating...`,
      } as ILoggerLog);
    });

    it(`should get the Discord client`, async (): Promise<void> => {
      expect.assertions(2);

      await service.login();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should get the Sonia's secret token`, async (): Promise<void> => {
      expect.assertions(2);

      await service.login();

      expect(discordSoniaConfigServiceGetSecretTokenSpy).toHaveBeenCalledTimes(1);
      expect(discordSoniaConfigServiceGetSecretTokenSpy).toHaveBeenCalledWith();
    });

    it(`should login`, async (): Promise<void> => {
      expect.assertions(1);

      await service.login();

      expect(loginMock).toHaveBeenCalledTimes(1);
    });

    describe(`when the login failed`, (): void => {
      beforeEach((): void => {
        loginMock = jest.fn().mockRejectedValue(new Error(`error`));
        client = createHydratedMock<Client>({
          login: loginMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should log about the authentication error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.login()).rejects.toThrow(new Error(`error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordAuthenticationService`,
          message: `text-authentication failed`,
        } as ILoggerLog);
      });

      it(`should log the error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.login()).rejects.toThrow(new Error(`error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordAuthenticationService`,
          message: `error-Error: error`,
        } as ILoggerLog);
      });

      it(`should not log about the authentication success`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.login()).rejects.toThrow(new Error(`error`));

        expect(loggerServiceSuccessSpy).not.toHaveBeenCalled();
      });

      it(`should not notify that the authentication was successful`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.login()).rejects.toThrow(new Error(`error`));

        expect(notifyIsAuthenticatedSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the login was successful`, (): void => {
      beforeEach((): void => {
        loginMock.mockResolvedValue(``);
        client = createHydratedMock<Client>({
          login: loginMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should log about the authentication success`, async (): Promise<void> => {
        expect.assertions(2);

        await service.login();

        expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
          context: `DiscordAuthenticationService`,
          message: `text-authentication successful`,
        } as ILoggerLog);
      });

      it(`should notify that the authentication was successful`, async (): Promise<void> => {
        expect.assertions(2);

        await service.login();

        expect(notifyIsAuthenticatedSpy).toHaveBeenCalledTimes(1);
        expect(notifyIsAuthenticatedSpy).toHaveBeenCalledWith();
      });

      it(`should not log about the authentication error`, async (): Promise<void> => {
        expect.assertions(1);

        await service.login();

        expect(loggerServiceErrorSpy).not.toHaveBeenCalled();
      });

      it(`should not log the error`, async (): Promise<void> => {
        expect.assertions(1);

        await service.login();

        expect(loggerServiceErrorSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe(`isAuthenticated$()`, (): void => {
    beforeEach((): void => {
      service = new DiscordAuthenticationService();
    });

    it(`should be false by default`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.isAuthenticated$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(false);
    });

    describe(`when the is authenticated event is notified`, (): void => {
      it(`should emit a new value into the stream`, async (): Promise<void> => {
        expect.assertions(1);
        service.notifyIsAuthenticated();

        const result = await service.isAuthenticated$().pipe(take(1)).toPromise();

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`notifyIsAuthenticated()`, (): void => {
    beforeEach((): void => {
      service = new DiscordAuthenticationService();
    });

    it(`should notify that the client is authenticated`, async (): Promise<void> => {
      expect.assertions(1);
      service.notifyIsAuthenticated();

      const result = await service.isAuthenticated$().pipe(take(1)).toPromise();

      expect(result).toStrictEqual(true);
    });
  });
});
