import { DiscordChannelTypingService } from './discord-channel-typing.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DMChannel, NewsChannel, TextChannel, ThreadChannel } from 'discord.js';
import { createHydratedMock, createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordChannelTypingService`, (): void => {
  let service: DiscordChannelTypingService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordChannelTyping service`, (): void => {
      expect.assertions(1);

      service = DiscordChannelTypingService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordChannelTypingService));
    });

    it(`should return the created DiscordChannelTyping service`, (): void => {
      expect.assertions(1);

      const result = DiscordChannelTypingService.getInstance();

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

    it(`should notify the DiscordChannelTyping service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordChannelTypingService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_CHANNEL_TYPING_SERVICE
      );
    });
  });

  describe(`sendTyping()`, (): void => {
    let channel: TextChannel | DMChannel | NewsChannel | ThreadChannel;

    let sendTypingMock: jest.Mock;
    let loggerServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordChannelTypingService();

      sendTypingMock = jest.fn().mockRejectedValue(new Error(`sendTyping error`));
      channel = createMock<TextChannel>({
        sendTyping: sendTypingMock,
      });
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should add and show one typing indicator for the given channel`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.sendTyping(channel)).rejects.toThrow(new Error(`sendTyping error`));

      expect(sendTypingMock).toHaveBeenCalledTimes(1);
      expect(sendTypingMock).toHaveBeenCalledWith();
    });

    describe(`when an error occur with Discord`, (): void => {
      beforeEach((): void => {
        sendTypingMock.mockRejectedValue(new Error(`sendTyping error`));
        channel = createHydratedMock<TextChannel>({
          id: `dummy-channel-id`,
          sendTyping: sendTypingMock,
        });
      });

      it(`should log about the error`, async (): Promise<void> => {
        expect.assertions(4);

        await expect(service.sendTyping(channel)).rejects.toThrow(new Error(`sendTyping error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordChannelTypingService`,
          message: `text-failed to show a typing indicator for the channel value-dummy-channel-id`,
        } as ILoggerLog);
        expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
          context: `DiscordChannelTypingService`,
          message: `text-Error: sendTyping error`,
        } as ILoggerLog);
      });
    });

    describe(`when the typing indicator was successfully shown into Discord`, (): void => {
      beforeEach((): void => {
        sendTypingMock.mockResolvedValue(undefined);
        channel = createMock<TextChannel>({
          id: `dummy-channel-id`,
          sendTyping: sendTypingMock,
        });
      });

      it(`should not log about the error`, async (): Promise<void> => {
        expect.assertions(1);

        await service.sendTyping(channel);

        expect(loggerServiceErrorSpy).not.toHaveBeenCalled();
      });
    });
  });
});
