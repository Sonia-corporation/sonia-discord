import { DiscordLoggerErrorService } from './discord-logger-error.service';
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
import cryptoRandomString from 'crypto-random-string';
import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordLoggerErrorService`, (): void => {
  let service: DiscordLoggerErrorService;
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
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();

      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
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

        expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
        expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
          channelName: `errors`,
          messageResponse: discordMessageResponse,
        } as IDiscordGuildSoniaSendMessageToChannel);
      });
    });

    describe(`when the given error is an error`, (): void => {
      beforeEach((): void => {
        error = new Error(`dummy-error`);
      });

      it(`should log the given error`, (): void => {
        expect.assertions(2);

        service.handleError(error);

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordLoggerErrorService`,
          message: `text-Error: dummy-error`,
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
        expect(getErrorMessageResponseSpy).toHaveBeenCalledWith(new Error(`dummy-error`));
      });

      it(`should send a message to the errors channel to Sonia Discord`, (): void => {
        expect.assertions(2);

        service.handleError(error);

        expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledTimes(1);
        expect(discordGuildSoniaServiceSendMessageToChannelSpy).toHaveBeenCalledWith({
          channelName: `errors`,
          messageResponse: discordMessageResponse,
        } as IDiscordGuildSoniaSendMessageToChannel);
      });
    });
  });

  describe(`getErrorMessageResponse()`, (): void => {
    let error: Error | string;

    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageErrorImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageErrorImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      error = `dummy-error`;

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest
        .spyOn(discordSoniaService, `getCorporationMessageEmbedAuthor`)
        .mockImplementation();
      discordMessageConfigServiceGetMessageErrorImageColorSpy = jest
        .spyOn(discordMessageConfigService, `getMessageErrorImageColor`)
        .mockImplementation();
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`).mockImplementation();
      discordMessageConfigServiceGetMessageErrorImageUrlSpy = jest
        .spyOn(discordMessageConfigService, `getMessageErrorImageUrl`)
        .mockImplementation();
    });

    it(`should return an error message response with an embed author`, (): void => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = service.getErrorMessageResponse(error);

      expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return an error message response with an embed color`, (): void => {
      expect.assertions(1);
      const color: ColorEnum = ColorEnum.CANDY;
      discordMessageConfigServiceGetMessageErrorImageColorSpy.mockReturnValue(color);

      const result = service.getErrorMessageResponse(error);

      expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
    });

    describe(`when the Discord Sonia image url is null`, (): void => {
      let imageUrl: null;

      beforeEach((): void => {
        imageUrl = null;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return an error message response with an embed footer without an icon`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.footer?.iconURL).toBeUndefined();
      });
    });

    describe(`when the Discord Sonia image url is an icon url`, (): void => {
      let imageUrl: string;

      beforeEach((): void => {
        imageUrl = `dummy-image-url`;

        discordSoniaServiceGetImageUrlSpy.mockReturnValue(imageUrl);
      });

      it(`should return an error message response with an embed footer with a Sonia icon`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.footer?.iconURL).toStrictEqual(`dummy-image-url`);
      });
    });

    it(`should return an error message response with an embed footer with a text`, (): void => {
      expect.assertions(1);

      const result = service.getErrorMessageResponse(error);

      expect(result.options.embed?.footer?.text).toStrictEqual(`Discord error`);
    });

    it(`should return an error message response with an embed thumbnail icon`, (): void => {
      expect.assertions(1);
      const icon: IconEnum = IconEnum.ALARM;
      discordMessageConfigServiceGetMessageErrorImageUrlSpy.mockReturnValue(icon);

      const result = service.getErrorMessageResponse(error);

      expect(result.options.embed?.thumbnail?.url).toStrictEqual(IconEnum.ALARM);
    });

    it(`should return an error message response with an embed timestamp set as now`, (): void => {
      expect.assertions(2);

      const result = service.getErrorMessageResponse(error);

      expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);
      expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
    });

    describe(`when the given error is a string`, (): void => {
      beforeEach((): void => {
        error = `dummy-error`;
      });

      it(`should return an error message response with an embed title displaying the given error`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.title).toStrictEqual(`dummy-error`);
      });

      it(`should return an error message response without an embed description`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.description).toBeUndefined();
      });

      it(`should return an error message response without an embed field`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.fields).toBeUndefined();
      });
    });

    describe(`when the given error is an error`, (): void => {
      beforeEach((): void => {
        error = new Error(`dummy-error`);
      });

      it(`should return an error message response with an embed title displaying the given error name`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.title).toStrictEqual(`Error`);
      });

      it(`should return an error message response with an embed description displaying the given error message`, (): void => {
        expect.assertions(1);

        const result = service.getErrorMessageResponse(error);

        expect(result.options.embed?.description).toStrictEqual(`dummy-error`);
      });

      describe(`when the given error stack is undefined`, (): void => {
        beforeEach((): void => {
          error = new Error(`dummy-error`);
          error.stack = undefined;
        });

        it(`should return an error message response without an embed field`, (): void => {
          expect.assertions(1);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields).toBeUndefined();
        });
      });

      describe(`when the given error stack is a string`, (): void => {
        beforeEach((): void => {
          error = new Error(`dummy-error`);
          error.stack = `dummy-stack`;
        });

        it(`should return an error message response with an embed field`, (): void => {
          expect.assertions(1);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields?.length).toStrictEqual(1);
        });

        it(`should return an error message response with an embed field title`, (): void => {
          expect.assertions(1);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields?.[0].name).toStrictEqual(`My blood trace`);
        });

        it(`should return an error message response with an embed field value displaying the given error stack trace`, (): void => {
          expect.assertions(1);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields?.[0].value).toStrictEqual(`dummy-stack`);
        });
      });

      describe(`when the given error stack is a string greater than the Discord limit`, (): void => {
        beforeEach((): void => {
          error = new Error(`dummy-error`);
          error.stack = cryptoRandomString({
            length: 1050,
          });
        });

        it(`should return an error message response with an embed field`, (): void => {
          expect.assertions(1);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields?.length).toStrictEqual(1);
        });

        it(`should return an error message response with an embed field title`, (): void => {
          expect.assertions(1);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields?.[0].name).toStrictEqual(`My blood trace`);
        });

        it(`should return an error message response with an embed field value displaying the given error stack trace with an ellipsis when the limit is reached`, (): void => {
          expect.assertions(2);

          const result = service.getErrorMessageResponse(error);

          expect(result.options.embed?.fields?.[0].value.length).toStrictEqual(1024);
          expect(_.endsWith(result.options.embed?.fields?.[0].value, `...`)).toStrictEqual(true);
        });
      });
    });

    it(`should return an unify error message response`, (): void => {
      expect.assertions(1);

      const result = service.getErrorMessageResponse(error);

      expect(result.options.split).toStrictEqual(false);
    });

    it(`should return an error message response with an empty response`, (): void => {
      expect.assertions(1);

      const result = service.getErrorMessageResponse(error);

      expect(result.response).toStrictEqual(``);
    });
  });
});
