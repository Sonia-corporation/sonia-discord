import { FirebaseDmsNewVersionCountMessageResponseService } from './firebase-dms-new-version-count-message-response.service';
import { FirebaseDmsNewVersionCountService } from './firebase-dms-new-version-count.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { Message } from 'discord.js';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsNewVersionCountService`, (): void => {
  let service: FirebaseDmsNewVersionCountService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let firebaseDmsNewVersionCountMessageResponseService: FirebaseDmsNewVersionCountMessageResponseService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseDmsNewVersionCountMessageResponseService = FirebaseDmsNewVersionCountMessageResponseService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsNewVersionCountService service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsNewVersionCountService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsNewVersionCountService));
    });

    it(`should return the created FirebaseDmsNewVersionCountService service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsNewVersionCountService.getInstance();

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

    it(`should notify the FirebaseDmsNewVersionCountService service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsNewVersionCountService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_NEW_VERSION_COUNT_SERVICE
      );
    });
  });

  describe(`countDms()`, (): void => {
    let dmMessages: ((Message | null) | void)[] | void;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsNewVersionCountService();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy = jest
        .spyOn(firebaseDmsNewVersionCountMessageResponseService, `getMessageResponse`)
        .mockReturnValue(discordMessageResponse);
    });

    describe(`when the given DM messages is undefined`, (): void => {
      beforeEach((): void => {
        dmMessages = undefined;
      });

      it(`should log that no release note message was sent`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-no release note message sent`,
        } as ILoggerLog);
      });

      it(`should not get a message response about the count`, (): void => {
        expect.assertions(1);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given DM messages is an empty array`, (): void => {
      beforeEach((): void => {
        dmMessages = [];
      });

      it(`should log that no release note message was sent`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-no release note message sent`,
        } as ILoggerLog);
      });

      it(`should not get a message response about the count`, (): void => {
        expect.assertions(1);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given DM messages is an array with one undefined value`, (): void => {
      beforeEach((): void => {
        dmMessages = [null];
      });

      it(`should log that no release note message was sent for the one user`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-no release note message sent for the value-1 user`,
        } as ILoggerLog);
      });

      it(`should not get a message response about the count`, (): void => {
        expect.assertions(1);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given DM messages is an array with two undefined values`, (): void => {
      beforeEach((): void => {
        dmMessages = [null, null];
      });

      it(`should log that no release note message was sent for the two users`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-no release note message sent for the value-2 users`,
        } as ILoggerLog);
      });

      it(`should not get a message response about the count`, (): void => {
        expect.assertions(1);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given DM messages is an array with one message`, (): void => {
      beforeEach((): void => {
        dmMessages = [createMock<Message>()];
      });

      it(`should log that one release note message was sent for one user`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-value-1 release note message sent over value-1 user`,
        } as ILoggerLog);
      });

      it(`should get a message response about the count`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledWith(1, 1);
      });
    });

    describe(`when the given DM messages is an array with two messages`, (): void => {
      beforeEach((): void => {
        dmMessages = [createMock<Message>(), createMock<Message>()];
      });

      it(`should log that two release note messages were sent for two users`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-value-2 release note messages sent over value-2 users`,
        } as ILoggerLog);
      });

      it(`should get a message response about the count`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledWith(2, 2);
      });
    });

    describe(`when it is a mix of DMs with and without messages`, (): void => {
      beforeEach((): void => {
        dmMessages = [null, createMock<Message>(), null, createMock<Message>()];
      });

      it(`should log that two release note messages were sent for four users`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsNewVersionCountService`,
          message: `text-value-2 release note messages sent over value-4 users`,
        } as ILoggerLog);
      });

      it(`should get a message response about the count`, (): void => {
        expect.assertions(2);

        service.countDms(dmMessages);

        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledWith(4, 2);
      });
    });
  });
});
