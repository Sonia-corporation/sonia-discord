import { Subject } from "rxjs";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildSoniaService } from "./discord-guild-sonia.service";

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordGuildSoniaService`, (): void => {
  let service: DiscordGuildSoniaService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildSonia service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildSoniaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildSoniaService));
    });

    it(`should return the created DiscordGuildSonia service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildSoniaService.getInstance();

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

    it(`should notify the DiscordGuildSonia service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildSoniaService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_SONIA_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let isReady$: Subject<boolean>;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let setSoniaGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildSoniaService();
      isReady$ = new Subject<boolean>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `isReady$`)
        .mockReturnValue(isReady$.asObservable());
      setSoniaGuildSpy = jest
        .spyOn(service, `setSoniaGuild`)
        .mockImplementation();
    });

    it(`should check if the Discord client is ready`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should not set the Sonia guild`, (): void => {
      expect.assertions(1);

      service.init();

      expect(setSoniaGuildSpy).not.toHaveBeenCalled();
    });

    describe(`when the Discord client is ready`, (): void => {
      it(`should set the Sonia guild`, (): void => {
        expect.assertions(2);

        service.init();
        isReady$.next(true);

        expect(setSoniaGuildSpy).toHaveBeenCalledTimes(1);
        expect(setSoniaGuildSpy).toHaveBeenCalledWith();
      });
    });

    describe(`when the Discord client is not ready`, (): void => {
      it(`should not set the Sonia guild`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.next(false);

        expect(setSoniaGuildSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Discord client ready state throw error`, (): void => {
      it(`should not set the Sonia guild`, (): void => {
        expect.assertions(1);

        service.init();
        isReady$.error(new Error(`error`));

        expect(setSoniaGuildSpy).not.toHaveBeenCalled();
      });
    });

    it(`should log about listening Discord client ready state`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordGuildSoniaService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });
  });
});
