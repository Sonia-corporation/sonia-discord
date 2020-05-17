import { Client, PresenceData } from "discord.js";
import _ from "lodash";
import { Subject } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DISCORD_PRESENCE_ACTIVITY } from "../constants/discord-presence-activity";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DiscordActivitySoniaService } from "./discord-activity-sonia.service";

jest.mock(`../../../logger/services/chalk.service`);

describe(`DiscordActivitySoniaService`, (): void => {
  let service: DiscordActivitySoniaService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordClientService: DiscordClientService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordClientService = DiscordClientService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordActivitySonia service`, (): void => {
      expect.assertions(1);

      service = DiscordActivitySoniaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordActivitySoniaService));
    });

    it(`should return the created DiscordActivitySonia service`, (): void => {
      expect.assertions(1);

      const result = DiscordActivitySoniaService.getInstance();

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

    it(`should notify the DiscordActivitySonia service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordActivitySoniaService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_ACTIVITY_SONIA_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let isReady$: Subject<boolean>;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let setRandomPresenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordActivitySoniaService();
      isReady$ = new Subject<boolean>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `isReady$`)
        .mockReturnValue(isReady$.asObservable());
      setRandomPresenceSpy = jest
        .spyOn(service, `setRandomPresence`)
        .mockImplementation();
    });

    it(`should check if the Discord client is ready`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord client is ready`, (): void => {
      it(`should set a random presence for Sonia`, (): void => {
        expect.assertions(2);

        service.init();
        isReady$.next(true);

        expect(setRandomPresenceSpy).toHaveBeenCalledTimes(1);
        expect(setRandomPresenceSpy).toHaveBeenCalledWith();
      });
    });

    describe(`when the Discord client is not ready`, (): void => {
      it(`should not set a random presence for Sonia`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(setRandomPresenceSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Discord client ready state throw error`, (): void => {
      it(`should not set a random presence for Sonia`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.error(new Error(`error`));

        expect(setRandomPresenceSpy).not.toHaveBeenCalled();
      });
    });

    it(`should log about listening Discord client ready state`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordActivitySoniaService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });
  });

  describe(`setPresence()`, (): void => {
    let setPresenceMock: jest.Mock;
    let presenceActivity: IDiscordPresenceActivity;
    let client: Client;

    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      setPresenceMock = jest.fn();
      presenceActivity = {
        name: `dummy-name`,
        type: 8,
        url: `dummy-url`,
      };
      client = createMock<Client>({
        user: {
          setPresence: setPresenceMock,
        },
      });

      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `getClient`)
        .mockReturnValue(client);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.setPresence(presenceActivity);

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord client user is null`, (): void => {
      beforeEach((): void => {
        client.user = null;
      });

      it(`should not set the presence`, (): void => {
        expect.assertions(1);

        service.setPresence(presenceActivity);

        expect(setPresenceMock).not.toHaveBeenCalled();
      });

      it(`should not log about the update of the presence`, (): void => {
        expect.assertions(1);

        service.setPresence(presenceActivity);

        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Discord client user is valid`, (): void => {
      it(`should set the presence`, (): void => {
        expect.assertions(2);

        service.setPresence(presenceActivity);

        expect(setPresenceMock).toHaveBeenCalledTimes(1);
        expect(setPresenceMock).toHaveBeenCalledWith({
          activity: {
            name: `dummy-name`,
            type: 8,
            url: `dummy-url`,
          },
          afk: false,
          status: `online`,
        } as PresenceData);
      });

      it(`should log about the update of the presence`, (): void => {
        expect.assertions(2);

        service.setPresence(presenceActivity);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordActivitySoniaService`,
          message: `text-Sonia presence updated to: value-8 text-x value-dummy-name`,
        } as ILoggerLog);
      });
    });
  });

  describe(`setRandomPresence()`, (): void => {
    let sampleSpy: jest.SpyInstance;
    let setPresenceSpy: jest.SpyInstance;

    beforeEach((): void => {
      sampleSpy = jest.spyOn(_, `sample`);
      setPresenceSpy = jest.spyOn(service, `setPresence`);
    });

    it(`should get a random Discord presence activity`, (): void => {
      expect.assertions(2);

      service.setRandomPresence();

      expect(sampleSpy).toHaveBeenCalledTimes(1);
      expect(sampleSpy).toHaveBeenCalledWith(DISCORD_PRESENCE_ACTIVITY);
    });

    describe(`when no Discord presence activity was found`, (): void => {
      beforeEach((): void => {
        sampleSpy.mockReturnValue(undefined);
      });

      it(`should not set the Discord presence activity`, (): void => {
        expect.assertions(1);

        service.setRandomPresence();

        expect(setPresenceSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when a Discord presence activity was found`, (): void => {
      beforeEach((): void => {
        sampleSpy.mockReturnValue(DISCORD_PRESENCE_ACTIVITY[0]);
      });

      it(`should set the Discord presence activity`, (): void => {
        expect.assertions(2);

        service.setRandomPresence();

        expect(setPresenceSpy).toHaveBeenCalledTimes(1);
        expect(setPresenceSpy).toHaveBeenCalledWith(
          DISCORD_PRESENCE_ACTIVITY[0]
        );
      });
    });
  });
});
