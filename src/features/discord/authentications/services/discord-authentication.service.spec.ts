import { Client, ClientUser } from "discord.js";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordAuthenticationService } from "./discord-authentication.service";

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordAuthenticationService`, (): void => {
  let service: DiscordAuthenticationService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
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
    let discordClientServiceGetClientOnMock: jest.Mock;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let loginSpy: jest.SpyInstance;
    let discordClientServiceNotifyIsReadySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordAuthenticationService();
      discordClientServiceGetClientOnMock = jest.fn();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `getClient`)
        .mockReturnValue({
          on: discordClientServiceGetClientOnMock as unknown,
        } as Client);
      loginSpy = jest.spyOn(service, `login`).mockImplementation();
      discordClientServiceNotifyIsReadySpy = jest
        .spyOn(discordClientService, `notifyIsReady`)
        .mockImplementation();
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should listen for the Discord client ready event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledWith(
        `ready`,
        expect.any(Function)
      );
    });

    describe(`when the Discord client ready event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn(
          (_event: string, listener: () => void): void => {
            listener();
          }
        );

        discordClientServiceGetClientSpy.mockReturnValue({
          on: discordClientServiceGetClientOnMock as unknown,
        } as Client);
      });

      it(`should get the Discord client`, (): void => {
        expect.assertions(2);

        service.init();

        expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(2);
        expect(discordClientServiceGetClientSpy).toHaveBeenNthCalledWith(2);
      });

      describe(`when the Discord client user is null`, (): void => {
        beforeEach((): void => {
          discordClientServiceGetClientSpy.mockReturnValue({
            on: discordClientServiceGetClientOnMock as unknown,
            user: null,
          } as Client);
        });

        it(`should log about the unknown user authentication`, (): void => {
          expect.assertions(2);

          service.init();

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

          discordClientServiceGetClientSpy.mockReturnValue({
            on: discordClientServiceGetClientOnMock as unknown,
            user: createMock<ClientUser>({
              tag,
            }),
          } as Client);
        });

        it(`should log about the unknown user authentication`, (): void => {
          expect.assertions(2);

          service.init();

          expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceLogSpy).toHaveBeenCalledWith({
            context: `DiscordAuthenticationService`,
            message: `text-authenticated as: value-"dummy-tag"`,
          } as ILoggerLog);
        });
      });

      it(`should notify that the Discord client is ready`, (): void => {
        expect.assertions(2);

        service.init();

        expect(discordClientServiceNotifyIsReadySpy).toHaveBeenCalledTimes(1);
        expect(discordClientServiceNotifyIsReadySpy).toHaveBeenCalledWith();
      });
    });

    it(`should log about listening Discord ready event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordAuthenticationService`,
        message: `text-listen "ready" event`,
      } as ILoggerLog);
    });

    it(`should login`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(loginSpy).toHaveBeenCalledWith();
    });
  });
});
