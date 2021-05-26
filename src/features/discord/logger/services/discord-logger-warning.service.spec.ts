import { DiscordLoggerWarningService } from './discord-logger-warning.service';
import { ColorEnum } from '../../../../enums/color.enum';
import { IconEnum } from '../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { IDiscordGuildSoniaSendMessageToChannel } from '../../guilds/interfaces/discord-guild-sonia-send-message-to-channel';
import { DiscordGuildSoniaService } from '../../guilds/services/discord-guild-sonia.service';
import { IDiscordMessageResponse } from '../../messages/interfaces/discord-message-response';
import { DiscordMessageConfigService } from '../../messages/services/config/discord-message-config.service';
import { DiscordSoniaService } from '../../users/services/discord-sonia.service';
import { MessageEmbedAuthor } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordLoggerWarningService`, (): void => {
  let service: DiscordLoggerWarningService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordLoggerWarning service`, (): void => {
      expect.assertions(1);

      service = DiscordLoggerWarningService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordLoggerWarningService));
    });

    it(`should return the created DiscordLoggerWarning service`, (): void => {
      expect.assertions(1);

      const result = DiscordLoggerWarningService.getInstance();

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

    it(`should notify the DiscordLoggerWarning service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordLoggerWarningService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_LOGGER_WARNING_SERVICE
      );
    });
  });

  describe(`handleWarning()`, (): void => {
    let warning: string;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceWarningSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let getWarningMessageResponseSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordLoggerWarningService();
      warning = `dummy-warning`;
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();

      loggerServiceWarningSpy = jest.spyOn(loggerService, `warning`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getWarningMessageResponseSpy = jest
        .spyOn(service, `getWarningMessageResponse`)
        .mockReturnValue(discordMessageResponse);
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
    });

    it(`should log the given warning`, (): void => {
      expect.assertions(2);

      service.handleWarning(warning);

      expect(loggerServiceWarningSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceWarningSpy).toHaveBeenCalledWith({
        context: `DiscordLoggerWarningService`,
        message: `text-dummy-warning`,
      } as ILoggerLog);
    });

    it(`should log about sending a message to the warnings channel to Sonia Discord`, (): void => {
      expect.assertions(2);

      service.handleWarning(warning);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordLoggerWarningService`,
        message: `text-send message to Sonia Discord warnings channel`,
      } as ILoggerLog);
    });

    it(`should get the warning message response`, (): void => {
      expect.assertions(2);

      service.handleWarning(warning);

      expect(getWarningMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getWarningMessageResponseSpy).toHaveBeenCalledWith(`dummy-warning`);
    });

    it(`should send a message to the warnings channel to Sonia Discord`, (): void => {
      expect.assertions(2);

      service.handleWarning(warning);

      expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
      expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
        channelName: `warnings`,
        messageResponse: discordMessageResponse,
      } as IDiscordGuildSoniaSendMessageToChannel);
    });
  });

  describe(`getWarningMessageResponse()`, (): void => {
    let warning: string;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandWarningImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandWarningImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      warning = `dummy-warning`;

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest
        .spyOn(discordSoniaService, `getCorporationMessageEmbedAuthor`)
        .mockImplementation();
      discordMessageConfigServiceGetMessageCommandWarningImageColorSpy = jest
        .spyOn(discordMessageConfigService, `getMessageWarningImageColor`)
        .mockImplementation();
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`).mockImplementation();
      discordMessageConfigServiceGetMessageCommandWarningImageUrlSpy = jest
        .spyOn(discordMessageConfigService, `getMessageWarningImageUrl`)
        .mockImplementation();
    });

    it(`should return a warning message response with an embed author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a warning message response with an embed color`, (): void => {
      expect.assertions(1);
      const color: ColorEnum = ColorEnum.CANDY;
      discordMessageConfigServiceGetMessageCommandWarningImageColorSpy.mockReturnValue(color);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when the Discord Sonia image url is null`, (): void => {
      let imageUrl: null;

      beforeEach((): void => {
        imageUrl = null;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a warning message response with an embed footer without an icon`, (): void => {
        expect.assertions(1);

        const result = service.getWarningMessageResponse(warning);

        expect(result.options.embed?.footer?.iconURL).toBeUndefined();
      });
    });

    describe(`when the Discord Sonia image url is an icon url`, (): void => {
      let imageUrl: string;

      beforeEach((): void => {
        imageUrl = `dummy-image-url`;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return a warning message response with an embed footer with a Sonia icon`, (): void => {
        expect.assertions(1);

        const result = service.getWarningMessageResponse(warning);

        expect(result.options.embed?.footer?.iconURL).toStrictEqual(`dummy-image-url`);
      });
    });

    it(`should return a warning message response with an embed footer with a text`, (): void => {
      expect.assertions(1);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.embed?.footer?.text).toStrictEqual(`Discord warning`);
    });

    it(`should return a warning message response with an embed thumbnail icon`, (): void => {
      expect.assertions(1);
      const icon: IconEnum = IconEnum.ALARM;
      discordMessageConfigServiceGetMessageCommandWarningImageUrlSpy.mockReturnValue(icon);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.embed?.thumbnail?.url).toStrictEqual(IconEnum.ALARM);
    });

    it(`should return a warning message response with an embed timestamp set as now`, (): void => {
      expect.assertions(2);

      const result = service.getWarningMessageResponse(warning);

      expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);
      expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
    });

    it(`should return a warning message response with an embed title`, (): void => {
      expect.assertions(1);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.embed?.title).toStrictEqual(`Warning!`);
    });

    it(`should return a warning message response with an embed description displaying the given warning`, (): void => {
      expect.assertions(1);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.embed?.description).toStrictEqual(`dummy-warning`);
    });

    it(`should return an unify warning message response`, (): void => {
      expect.assertions(1);

      const result = service.getWarningMessageResponse(warning);

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return a warning message response with an empty response`, (): void => {
      expect.assertions(1);

      const result = service.getWarningMessageResponse(warning);

      expect(result.response).toStrictEqual(``);
    });
  });
});
