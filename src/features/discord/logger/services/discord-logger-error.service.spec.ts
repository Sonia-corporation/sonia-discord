import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { IDiscordGuildSoniaSendMessageToChannel } from "../../guilds/interfaces/discord-guild-sonia-send-message-to-channel";
import { DiscordGuildSoniaService } from "../../guilds/services/discord-guild-sonia.service";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordLoggerErrorService } from "./discord-logger-error.service";

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordLoggerErrorService`, (): void => {
  let service: DiscordLoggerErrorService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordGuildSoniaService: DiscordGuildSoniaService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordLoggerError service`, (): void => {
      expect.assertions(1);

      service = DiscordLoggerErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordLoggerErrorService));
    });

    it(`should return the created DiscordLoggerError service`, (): void => {
      expect.assertions(1);

      const result = DiscordLoggerErrorService.getInstance();

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

    it(`should notify the DiscordLoggerError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordLoggerErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_LOGGER_ERROR_SERVICE
      );
    });
  });

  describe(`handleError()`, (): void => {
    let error: Error | string;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let getErrorMessageResponseSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordLoggerErrorService();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      getErrorMessageResponseSpy = jest
        .spyOn(service, `getErrorMessageResponse`)
        .mockReturnValue(discordMessageResponse);
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
    });

    describe(`when the given error is a string`, (): void => {
      beforeEach((): void => {
        error = `dummy-error`;
      });

      it(`should log the given error`, (): void => {
        expect.assertions(2);

        service.handleError(error);

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordLoggerErrorService`,
          message: `text-dummy-error`,
        } as ILoggerLog);
      });

      it(`should log about sending a message to the errors channel to Sonia Discord`, (): void => {
        expect.assertions(2);

        service.handleError(error);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordLoggerErrorService`,
          message: `text-send message to Sonia Discord errors channel`,
        } as ILoggerLog);
      });

      it(`should get the error message response`, (): void => {
        expect.assertions(2);

        service.handleError(error);

        expect(getErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getErrorMessageResponseSpy).toHaveBeenCalledWith(`dummy-error`);
      });

      it(`should send a message to the errors channel to Sonia Discord`, (): void => {
        expect.assertions(2);

        service.handleError(error);

        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy
        ).toHaveBeenCalledTimes(1);
        expect(
          discordGuildSoniaServiceSendMessageToChannelSpy
        ).toHaveBeenCalledWith({
          channelName: `errors`,
          messageResponse: discordMessageResponse,
        } as IDiscordGuildSoniaSendMessageToChannel);
      });
    });
  });
});
