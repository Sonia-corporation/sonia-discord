import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { ILoggerLog } from "../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../logger/services/logger.service";
import { AnyDiscordMessage } from "../../types/any-discord-message";
import { DiscordMessageCommandVersionService } from "./discord-message-command-version.service";

jest.mock(`../../../../logger/services/chalk.service`);

describe(`DiscordMessageCommandVersionService`, (): void => {
  let service: DiscordMessageCommandVersionService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVersionService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandVersionService)
      );
    });

    it(`should return the created DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandVersionService.getInstance();

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

    it(`should notify the DiscordMessageCommandVersion service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: AnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<AnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should log about the command`, (): void => {
      expect.assertions(2);

      service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandVersionService`,
        extendedContext: true,
        message: `context-[dummy-id] text-version command detected`,
      } as ILoggerLog);
    });

    it(`should return a Discord message response splitted`, (): void => {
      expect.assertions(1);

      const result: unknown = service.handleResponse(anyDiscordMessage);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(result.options.split).toStrictEqual(true);
    });

    it(`should return a Discord message response without a response text`, (): void => {
      expect.assertions(1);

      const result = service.handleResponse(anyDiscordMessage);

      expect(result.response).toStrictEqual(``);
    });
  });
});
