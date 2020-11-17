import { DiscordChannelTypingService } from './discord-channel-typing.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DMChannel, NewsChannel, TextChannel } from 'discord.js';
import { createMock } from 'ts-auto-mock';

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

  describe(`addOneIndicator()`, (): void => {
    let channel: TextChannel | DMChannel | NewsChannel;

    let startTypingMock: jest.Mock;
    let loggerServiceErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordChannelTypingService();

      startTypingMock = jest.fn().mockRejectedValue(new Error(`startTyping error`));
      channel = createMock<TextChannel>({
        startTyping: startTypingMock,
      });
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
    });

    it(`should add and show one typing indicator for the given channel`, async (): Promise<void> => {
      expect.assertions(2);

      await service.addOneIndicator(channel);

      expect(startTypingMock).toHaveBeenCalledTimes(1);
      expect(startTypingMock).toHaveBeenCalledWith();
    });

    describe(`when an error occur with Discord`, (): void => {
      beforeEach((): void => {
        startTypingMock.mockRejectedValue(new Error(`startTyping error`));
        channel = createMock<TextChannel>({
          id: `dummy-channel-id`,
          startTyping: startTypingMock,
        });
      });

      it(`should log about the error`, async (): Promise<void> => {
        expect.assertions(2);

        await service.addOneIndicator(channel);

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordChannelTypingService`,
          message: `text-failed to show a typing indicator for the channel value-dummy-channel-id`,
        } as ILoggerLog);
      });
    });

    describe(`when the typing indicator was successfully shown into Discord`, (): void => {
      beforeEach((): void => {
        startTypingMock.mockResolvedValue(undefined);
        channel = createMock<TextChannel>({
          id: `dummy-channel-id`,
          startTyping: startTypingMock,
        });
      });

      it(`should not log about the error`, async (): Promise<void> => {
        expect.assertions(1);

        await service.addOneIndicator(channel);

        expect(loggerServiceErrorSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe(`removeOneIndicator()`, (): void => {
    let channel: TextChannel | DMChannel | NewsChannel;

    let stopTypingMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordChannelTypingService();

      stopTypingMock = jest.fn().mockImplementation();
      channel = createMock<TextChannel>({
        stopTyping: stopTypingMock,
      });
    });

    it(`should remove and hide one typing indicator for the given channel`, (): void => {
      expect.assertions(2);

      service.removeOneIndicator(channel);

      expect(stopTypingMock).toHaveBeenCalledTimes(1);
      expect(stopTypingMock).toHaveBeenCalledWith();
    });
  });
});
