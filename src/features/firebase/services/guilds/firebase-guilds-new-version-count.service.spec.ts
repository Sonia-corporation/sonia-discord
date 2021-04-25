import { FirebaseGuildsNewVersionCountMessageResponseService } from './firebase-guilds-new-version-count-message-response.service';
import { FirebaseGuildsNewVersionCountService } from './firebase-guilds-new-version-count.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { IDiscordGuildSoniaSendMessageToChannel } from '../../../discord/guilds/interfaces/discord-guild-sonia-send-message-to-channel';
import { DiscordGuildSoniaService } from '../../../discord/guilds/services/discord-guild-sonia.service';
import { IDiscordMessageResponse } from '../../../discord/messages/interfaces/discord-message-response';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { messaging } from 'firebase-admin/lib/messaging';
import { createMock } from 'ts-auto-mock';
import Message = messaging.Message;

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsNewVersionCountService`, (): void => {
  let service: FirebaseGuildsNewVersionCountService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let firebaseGuildsNewVersionCountMessageResponseService: FirebaseGuildsNewVersionCountMessageResponseService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    firebaseGuildsNewVersionCountMessageResponseService = FirebaseGuildsNewVersionCountMessageResponseService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsNewVersionCountService service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsNewVersionCountService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsNewVersionCountService));
    });

    it(`should return the created FirebaseGuildsNewVersionCountService service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsNewVersionCountService.getInstance();

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

    it(`should notify the FirebaseGuildsNewVersionCountService service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsNewVersionCountService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_COUNT_SERVICE
      );
    });
  });

  describe(`countChannelsAndGuilds()`, (): void => {
    let guildMessages: ((Message | void)[] | void)[] | void;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let firebaseGuildsNewVersionCountMessageResponseServiceGetMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionCountService();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      firebaseGuildsNewVersionCountMessageResponseServiceGetMessageResponseSpy = jest
        .spyOn(firebaseGuildsNewVersionCountMessageResponseService, `getMessageResponse`)
        .mockReturnValue(discordMessageResponse);
    });

    describe(`when the given guild messages is undefined`, (): void => {
      beforeEach((): void => {
        guildMessages = undefined;
      });

      it(`should log that no release note message was sent`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an empty array`, (): void => {
      beforeEach((): void => {
        guildMessages = [];
      });

      it(`should log that no release note message was sent`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one undefined value`, (): void => {
      beforeEach((): void => {
        guildMessages = [undefined];
      });

      it(`should log that no release note message was sent for the one guild`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent for the value-1 guild`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two undefined values`, (): void => {
      beforeEach((): void => {
        guildMessages = [undefined, undefined];
      });

      it(`should log that no release note message was sent for the two guilds`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent for the value-2 guilds`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one empty array`, (): void => {
      beforeEach((): void => {
        guildMessages = [[]];
      });

      it(`should log that no release note message was sent for the one guild`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent for the value-1 guild`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two empty arrays`, (): void => {
      beforeEach((): void => {
        guildMessages = [[], []];
      });

      it(`should log that no release note message was sent for the two guilds`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent for the value-2 guilds`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one array of one undefined value`, (): void => {
      beforeEach((): void => {
        guildMessages = [[undefined]];
      });

      it(`should log that no release note message was sent for the one guild`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent for the value-1 guild`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two arrays of one undefined value`, (): void => {
      beforeEach((): void => {
        guildMessages = [[undefined], [undefined]];
      });

      it(`should log that no release note message was sent for the two guilds`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-no release note message sent for the value-2 guilds`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one array of one message`, (): void => {
      beforeEach((): void => {
        guildMessages = [[createMock<Message>()]];
      });

      it(`should log that one release note message was sent for one guild of one`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-value-1 release note message sent over value-1 guild of value-1`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two arrays of one message`, (): void => {
      beforeEach((): void => {
        guildMessages = [[createMock<Message>()], [createMock<Message>()]];
      });

      it(`should log that two release note messages were sent for two guilds of two`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-value-2 release note messages sent over value-2 guilds of value-2`,
        } as ILoggerLog);
      });
    });

    describe(`when it is a mix of guilds with and without messages`, (): void => {
      beforeEach((): void => {
        guildMessages = [
          [],
          [undefined],
          [createMock<Message>()],
          [undefined, undefined],
          [createMock<Message>(), undefined],
          [createMock<Message>(), createMock<Message>()],
        ];
      });

      it(`should log that four release note messages were sent for three guilds of six`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionCountService`,
          message: `text-value-4 release note messages sent over value-3 guilds of value-6`,
        } as ILoggerLog);
      });
    });

    it(`should get a message response about the count`, (): void => {
      expect.assertions(2);
      guildMessages = [
        [],
        [undefined],
        [createMock<Message>()],
        [undefined, undefined],
        [createMock<Message>(), undefined],
        [createMock<Message>(), createMock<Message>()],
      ];

      service.countChannelsAndGuilds(guildMessages);

      expect(firebaseGuildsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsNewVersionCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledWith(6, 3, 4);
    });

    it(`should send the message response about the count into the Sonia logs channel`, (): void => {
      expect.assertions(2);
      guildMessages = [
        [],
        [undefined],
        [createMock<Message>()],
        [undefined, undefined],
        [createMock<Message>(), undefined],
        [createMock<Message>(), createMock<Message>()],
      ];

      service.countChannelsAndGuilds(guildMessages);

      expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
        channelName: `logs`,
        messageResponse: discordMessageResponse,
      } as IDiscordGuildSoniaSendMessageToChannel);
    });
  });
});
