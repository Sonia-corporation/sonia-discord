import { DiscordMessageScheduleNoonCountMessageResponseService } from './discord-message-schedule-noon-count-message-response.service';
import { DiscordMessageScheduleNoonCountService } from './discord-message-schedule-noon-count.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../logger/services/logger.service';
import { IDiscordGuildSoniaSendMessageToChannel } from '../../../guilds/interfaces/discord-guild-sonia-send-message-to-channel';
import { DiscordGuildSoniaService } from '../../../guilds/services/discord-guild-sonia.service';
import { IDiscordMessageResponse } from '../../interfaces/discord-message-response';
import { Message } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageScheduleNoonCountService`, (): void => {
  let service: DiscordMessageScheduleNoonCountService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordMessageScheduleNoonCountMessageResponseService: DiscordMessageScheduleNoonCountMessageResponseService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordMessageScheduleNoonCountMessageResponseService = DiscordMessageScheduleNoonCountMessageResponseService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageScheduleNoonCount service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageScheduleNoonCountService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageScheduleNoonCountService));
    });

    it(`should return the created DiscordMessageScheduleNoonCount service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageScheduleNoonCountService.getInstance();

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

    it(`should notify the DiscordMessageScheduleNoonCount service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageScheduleNoonCountService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SCHEDULE_NOON_COUNT_SERVICE
      );
    });
  });

  describe(`countChannelsAndGuilds()`, (): void => {
    let guildMessages: ((Message | void)[] | void)[] | void;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordMessageScheduleNoonCountMessageResponseServiceGetMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageScheduleNoonCountService();
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      discordMessageScheduleNoonCountMessageResponseServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageScheduleNoonCountMessageResponseService, `getMessageResponse`)
        .mockReturnValue(discordMessageResponse);
    });

    describe(`when the given guild messages is undefined`, (): void => {
      beforeEach((): void => {
        guildMessages = undefined;
      });

      it(`should log that no noon message was sent`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an empty array`, (): void => {
      beforeEach((): void => {
        guildMessages = [];
      });

      it(`should log that no noon message was sent`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one undefined value`, (): void => {
      beforeEach((): void => {
        guildMessages = [undefined];
      });

      it(`should log that no noon message was sent for the one guild`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent for the value-1 guild`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two undefined values`, (): void => {
      beforeEach((): void => {
        guildMessages = [undefined, undefined];
      });

      it(`should log that no noon message was sent for the two guilds`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent for the value-2 guilds`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one empty array`, (): void => {
      beforeEach((): void => {
        guildMessages = [[]];
      });

      it(`should log that no noon message was sent for the one guild`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent for the value-1 guild`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two empty arrays`, (): void => {
      beforeEach((): void => {
        guildMessages = [[], []];
      });

      it(`should log that no noon message was sent for the two guilds`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent for the value-2 guilds`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one array of one undefined value`, (): void => {
      beforeEach((): void => {
        guildMessages = [[undefined]];
      });

      it(`should log that no noon message was sent for the one guild`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent for the value-1 guild`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two arrays of one undefined value`, (): void => {
      beforeEach((): void => {
        guildMessages = [[undefined], [undefined]];
      });

      it(`should log that no noon message was sent for the two guilds`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-no noon message sent for the value-2 guilds`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with one array of one message`, (): void => {
      beforeEach((): void => {
        guildMessages = [[createHydratedMock<Message>()]];
      });

      it(`should log that one noon message was sent for one guild of one`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-value-1 noon message sent over value-1 guild of value-1`,
        } as ILoggerLog);
      });
    });

    describe(`when the given guild messages is an array with two arrays of one message`, (): void => {
      beforeEach((): void => {
        guildMessages = [[createHydratedMock<Message>()], [createHydratedMock<Message>()]];
      });

      it(`should log that two noon messages were sent for two guilds of two`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-value-2 noon messages sent over value-2 guilds of value-2`,
        } as ILoggerLog);
      });
    });

    describe(`when it is a mix of guilds with and without messages`, (): void => {
      beforeEach((): void => {
        guildMessages = [
          [],
          [undefined],
          [createHydratedMock<Message>()],
          [undefined, undefined],
          [createHydratedMock<Message>(), undefined],
          [createHydratedMock<Message>(), createHydratedMock<Message>()],
        ];
      });

      it(`should log that four noon messages were sent for three guilds of six`, (): void => {
        expect.assertions(2);

        service.countChannelsAndGuilds(guildMessages);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageScheduleNoonCountService`,
          message: `text-value-4 noon messages sent over value-3 guilds of value-6`,
        } as ILoggerLog);
      });
    });

    it(`should get a message response about the count`, (): void => {
      expect.assertions(2);
      guildMessages = [
        [],
        [undefined],
        [createHydratedMock<Message>()],
        [undefined, undefined],
        [createHydratedMock<Message>(), undefined],
        [createHydratedMock<Message>(), createHydratedMock<Message>()],
      ];

      service.countChannelsAndGuilds(guildMessages);

      expect(discordMessageScheduleNoonCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageScheduleNoonCountMessageResponseServiceGetMessageResponseSpy).toHaveBeenCalledWith(6, 3, 4);
    });

    it(`should send the message response about the count into the Sonia logs channel`, (): void => {
      expect.assertions(2);
      guildMessages = [
        [],
        [undefined],
        [createHydratedMock<Message>()],
        [undefined, undefined],
        [createHydratedMock<Message>(), undefined],
        [createHydratedMock<Message>(), createHydratedMock<Message>()],
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
