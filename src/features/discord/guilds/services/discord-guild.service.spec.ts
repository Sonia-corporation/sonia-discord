import { Subject } from "rxjs";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildService } from "./discord-guild.service";

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordGuildService`, (): void => {
  let service: DiscordGuildService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuild service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildService));
    });

    it(`should return the created DiscordGuild service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildService.getInstance();

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

    it(`should notify the DiscordGuild service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let isReady$: Subject<boolean>;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildService();
      isReady$ = new Subject<boolean>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `isReady$`)
        .mockReturnValue(isReady$.asObservable());
    });

    it(`should check if the Discord client is ready`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    describe(`when the Discord client is ready`, (): void => {
      it(`should do something at some point`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(true);

        expect(true).toBe(true);
      });
    });

    describe(`when the Discord client is not ready`, (): void => {
      it(`should do something at some point`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(true).toBe(true);
      });
    });

    describe(`when the Discord client ready state throw error`, (): void => {
      it(`should do something at some point`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.error(new Error(`error`));

        expect(true).toBe(true);
      });
    });

    it(`should log about listening Discord client ready state`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordGuildService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });
  });
});
