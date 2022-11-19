import { DiscordMessageCommandCookieService } from './discord-message-command-cookie.service';
import { ColorEnum } from '../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { DiscordSoniaService } from '../../../../../users/services/discord-sonia.service';
import { DiscordMessageCommandCookieDescriptionEnum } from '../../../../enums/commands/cookie/discord-message-command-cookie-description.enum';
import { DiscordMessageCommandCookieTitleEnum } from '../../../../enums/commands/cookie/discord-message-command-cookie-title.enum';
import { IDiscordMessageResponse } from '../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../config/discord-message-config.service';
import { DiscordMessageCommandVerifyChannelRightService } from '../../discord-message-command-verify-channel-right.service';
import { DISCORD_MESSAGE_COMMAND_COOKIE_DESCRIPTION_MESSAGES } from '../constants/discord-message-command-cookie-description-messages';
import { DISCORD_MESSAGE_COMMAND_COOKIE_TITLE_MESSAGES } from '../constants/discord-message-command-cookie-title-messages';
import {
  DMChannel,
  MessageEmbedAuthor,
  MessageEmbedFooter,
  MessageEmbedThumbnail,
  NewsChannel,
  TextChannel,
  ThreadChannel,
} from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock, createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandCookieService`, (): void => {
  let service: DiscordMessageCommandCookieService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageCommandVerifyChannelRightService: DiscordMessageCommandVerifyChannelRightService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageCommandVerifyChannelRightService = DiscordMessageCommandVerifyChannelRightService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandCookie service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandCookieService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandCookieService));
    });

    it(`should return the created DiscordMessageCommandCookie service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandCookieService.getInstance();

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

    it(`should notify the DiscordMessageCommandCookie service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandCookieService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_COOKIE_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;
    let errorDiscordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let canSendMessageResponseToThisChannelSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let getNotAllowedChannelErrorMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandCookieService();
      discordMessageResponse = createHydratedMock<IDiscordMessageResponse>();
      errorDiscordMessageResponse = createHydratedMock<IDiscordMessageResponse>();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        channel: createInstance(TextChannel.prototype),
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      canSendMessageResponseToThisChannelSpy = jest
        .spyOn(service, `canSendMessageResponseToThisChannel`)
        .mockReturnValue(false);
      getMessageResponseSpy = jest.spyOn(service, `getMessageResponse`).mockResolvedValue(discordMessageResponse);
      getNotAllowedChannelErrorMessageResponseSpy = jest
        .spyOn(service, `getNotAllowedChannelErrorMessageResponse`)
        .mockResolvedValue(errorDiscordMessageResponse);
    });

    it(`should log about the command`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandCookieService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-cookie command detected`,
      } as ILoggerLog);
    });

    it(`should check if the command is allowed for this channel`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(canSendMessageResponseToThisChannelSpy).toHaveBeenCalledTimes(1);
      expect(canSendMessageResponseToThisChannelSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the command is not allowed for this channel`, (): void => {
      beforeEach((): void => {
        canSendMessageResponseToThisChannelSpy.mockReturnValue(false);
      });

      it(`should not get a message response`, async (): Promise<void> => {
        expect.assertions(1);

        await service.handleResponse(anyDiscordMessage);

        expect(getMessageResponseSpy).not.toHaveBeenCalled();
      });

      it(`should return an error message response`, async (): Promise<void> => {
        expect.assertions(4);

        const result = await service.handleResponse(anyDiscordMessage);

        expect(getNotAllowedChannelErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getNotAllowedChannelErrorMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
        expect(result).toStrictEqual(errorDiscordMessageResponse);
        expect(result).not.toStrictEqual(discordMessageResponse);
      });
    });

    describe(`when the command is allowed for this channel`, (): void => {
      beforeEach((): void => {
        canSendMessageResponseToThisChannelSpy.mockReturnValue(true);
      });

      it(`should get a message response`, async (): Promise<void> => {
        expect.assertions(3);

        await service.handleResponse(anyDiscordMessage);

        expect(getNotAllowedChannelErrorMessageResponseSpy).not.toHaveBeenCalled();
        expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
        expect(getMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      it(`should return the message response`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.handleResponse(anyDiscordMessage);

        expect(result).not.toStrictEqual(errorDiscordMessageResponse);
        expect(result).toStrictEqual(discordMessageResponse);
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCookieImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandCookieImageUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandCookieService();

      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandCookieImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCookieImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandCookieImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandCookieImageUrl`
      );
      jest
        .spyOn(DISCORD_MESSAGE_COMMAND_COOKIE_DESCRIPTION_MESSAGES, `getRandomMessage`)
        .mockReturnValue(DiscordMessageCommandCookieDescriptionEnum.CHUCK_NORRIS_CAN_NOT_BEAT_ME);
      jest
        .spyOn(DISCORD_MESSAGE_COMMAND_COOKIE_TITLE_MESSAGES, `getRandomMessage`)
        .mockReturnValue(DiscordMessageCommandCookieTitleEnum.COOKIE_DELIVERY);
    });

    it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
      expect.assertions(1);
      const messageEmbedAuthor: MessageEmbedAuthor = createMock<MessageEmbedAuthor>();
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.author).toStrictEqual(messageEmbedAuthor);
    });

    it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCookieImageColorSpy.mockReturnValue(ColorEnum.CANDY);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.color).toStrictEqual(ColorEnum.CANDY);
    });

    it(`should return a Discord message response embed with a description`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.description).toBe(`Chuck Norris can't beat me.`);
    });

    it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
      expect.assertions(1);
      discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.footer).toStrictEqual({
        iconURL: `dummy-image-url`,
        text: `Bon appétit`,
      } as MessageEmbedFooter);
    });

    describe(`when the Sonia image url is null`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
      });

      it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: undefined,
          text: `Bon appétit`,
        } as MessageEmbedFooter);
      });
    });

    describe(`when the Sonia image url is "image-url"`, (): void => {
      beforeEach((): void => {
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse();

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: `image-url`,
          text: `Bon appétit`,
        } as MessageEmbedFooter);
      });
    });

    it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
      expect.assertions(1);
      discordMessageConfigServiceGetMessageCommandCookieImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.thumbnail).toStrictEqual({
        url: IconEnum.ARTIFICIAL_INTELLIGENCE,
      } as MessageEmbedThumbnail);
    });

    it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
      expect.assertions(2);

      const result = await service.getMessageResponse();

      expect(moment(result.options.embeds?.[0]?.timestamp).isValid()).toBe(true);
      expect(moment(result.options.embeds?.[0]?.timestamp).fromNow()).toBe(`a few seconds ago`);
    });

    it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.options.embeds?.[0]?.title).toBe(`Cookie delivery!`);
    });

    it(`should return a Discord message response without a response text`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse();

      expect(result.content).toBeUndefined();
    });
  });

  describe(`canSendMessageResponseToThisChannel()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageCommandVerifyChannelRightServiceVerifySpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>();
      discordMessageCommandVerifyChannelRightServiceVerifySpy = jest.spyOn(
        discordMessageCommandVerifyChannelRightService,
        `verify`
      );
    });

    it(`should verify if the command can be executed for the type of channel related to this message`, (): void => {
      expect.assertions(2);

      service.canSendMessageResponseToThisChannel(anyDiscordMessage);

      expect(discordMessageCommandVerifyChannelRightServiceVerifySpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandVerifyChannelRightServiceVerifySpy).toHaveBeenCalledWith(
        anyDiscordMessage,
        service.allowedChannels
      );
    });

    describe(`when the message comes from a DM channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(DMChannel.prototype),
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message comes from a text channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message comes from a thread channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(ThreadChannel.prototype),
        });
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeTrue();
      });
    });

    describe(`when the message comes from a news channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(NewsChannel.prototype),
        });
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.canSendMessageResponseToThisChannel(anyDiscordMessage);

        expect(result).toBeFalse();
      });
    });
  });

  describe(`getNotAllowedChannelErrorMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        channel: createInstance(TextChannel.prototype),
      });
      discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy = jest.spyOn(
        discordMessageCommandVerifyChannelRightService,
        `getErrorMessageResponse`
      );
    });

    it(`should get the error message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.getNotAllowedChannelErrorMessageResponse(anyDiscordMessage);

      expect(discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandVerifyChannelRightServiceGetErrorMessageResponseSpy).toHaveBeenCalledWith(
        anyDiscordMessage,
        service.allowedChannels
      );
    });

    it(`should return the error message response`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getNotAllowedChannelErrorMessageResponse(anyDiscordMessage);

      const discordMessageResponse: IDiscordMessageResponse = {
        options: {
          embeds: [
            {
              author: {
                iconURL: `https://i.ibb.co/XSB6Vng/icons8-girl-1024.png`,
                name: `[dev] Sonia`,
                url: `https://github.com/Sonia-corporation?type=source`,
              },
              color: 15562905,
              fields: [
                {
                  name: `Wrong channel!`,
                  value: `This command is not allowed on text channels.`,
                },
                {
                  name: `Allowed channels`,
                  value: `You can use this command only on private messages, text channels, and threads.`,
                },
                {
                  name: `Help me to get better!`,
                  value: `If you think that using this command on text channels should be allowed, do not hesitate to submit a [feature request](https://github.com/Sonia-corporation/sonia-discord/issues/new?labels=feature-request&template=feature_request.md&projects=sonia-corporation/sonia-discord/1&title=%5BFEATURE%5D+).`,
                },
              ],
              footer: {
                iconURL: undefined,
                text: `I don't allow you!`,
              },
              thumbnail: {
                url: `https://i.ibb.co/5jZmzSB/icons8-error-512.png`,
              },
              title: `I cannot let you do that!`,
            },
          ],
        },
      };
      expect(result).toMatchObject(discordMessageResponse);
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandCookieService();
      message = `dummy-message`;

      discordMessageConfigServiceGetMessageCommandPrefixSpy = jest
        .spyOn(discordMessageConfigService, `getMessageCommandPrefix`)
        .mockImplementation();
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(`@`);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@coo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-coo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!coo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@coo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-coo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!coo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@cookie`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@cookie dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-cookie dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!cookie dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@cookies`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-cookies`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!cookies`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@cookies dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-cookies dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!cookies dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@c`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-c`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!c`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@c dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-c dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!c dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-COOKIE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-COOKIE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@COOKIES`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcualias "cookies" uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-COOKIES`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!COOKIES`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@COOKIES dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-COOKIES dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!COOKIES dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@C`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-C`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!C`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@C dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-C dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!C dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });
    });

    describe(`when the message command prefix is "-" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([`-`, `!`]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@coo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-coo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!coo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@coo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-coo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!coo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@cookie`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@cookie dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-cookie dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!cookie dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-COOKIE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-COOKIE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@cookies`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-cookies`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!cookies`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@cookies dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-cookies dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!cookies dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@COOKIES`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-COOKIES`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!COOKIES`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@COOKIES dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-COOKIES dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the alias "cookies" cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!COOKIES dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@c`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-c`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!c`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@c dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-c dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!c dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@C`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-C`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!C`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@C dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-C dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!C dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });
    });
  });
});
