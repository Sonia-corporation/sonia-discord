import { DiscordMessageCommandQuoteService } from './discord-message-command-quote.service';
import { ColorEnum } from '../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { IQuote } from '../../../../../../quote/interfaces/quote';
import { IQuoteErrorApi } from '../../../../../../quote/interfaces/quote-error-api';
import { QuoteConfigService } from '../../../../../../quote/services/config/quote-config.service';
import { QuoteErrorApiService } from '../../../../../../quote/services/quote-error-api.service';
import { QuoteRandomService } from '../../../../../../quote/services/quote-random.service';
import { DiscordSoniaService } from '../../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../config/discord-message-config.service';
import { DiscordMessageErrorService } from '../../../helpers/discord-message-error.service';
import { MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandQuoteService`, (): void => {
  let service: DiscordMessageCommandQuoteService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let quoteRandomService: QuoteRandomService;
  let discordMessageErrorService: DiscordMessageErrorService;
  let quoteErrorApiService: QuoteErrorApiService;
  let quoteConfigService: QuoteConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    quoteRandomService = QuoteRandomService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
    quoteErrorApiService = QuoteErrorApiService.getInstance();
    quoteConfigService = QuoteConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandQuote service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandQuoteService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandQuoteService));
    });

    it(`should return the created DiscordMessageCommandQuote service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandQuoteService.getInstance();

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

    it(`should notify the DiscordMessageCommandQuote service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandQuoteService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_QUOTE_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandQuoteService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getMessageResponseSpy = jest.spyOn(service, `getMessageResponse`).mockResolvedValue(discordMessageResponse);
    });

    it(`should log about the command`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandQuoteService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-quote command detected`,
      } as ILoggerLog);
    });

    it(`should get a message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    it(`should return the message response`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.handleResponse(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let quote: IQuote;

    let quoteRandomServiceFetchRandomQuoteSpy: jest.SpyInstance;
    let quoteConfigServiceGetImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let quoteConfigServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;
    let quoteErrorApiServiceGetMessageResponseSpy: jest.SpyInstance;
    let quoteConfigServiceGetAuthorIconUrlSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandQuoteService();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      quote = createHydratedMock<IQuote>();

      quoteRandomServiceFetchRandomQuoteSpy = jest
        .spyOn(quoteRandomService, `fetchRandomQuote`)
        .mockRejectedValue(new Error(`fetchRandomQuote error`));
      quoteConfigServiceGetImageColorSpy = jest.spyOn(quoteConfigService, `getImageColor`);
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      quoteConfigServiceGetImageUrlSpy = jest.spyOn(quoteConfigService, `getImageUrl`);
      discordMessageErrorServiceHandleErrorSpy = jest
        .spyOn(discordMessageErrorService, `handleError`)
        .mockImplementation();
      quoteErrorApiServiceGetMessageResponseSpy = jest
        .spyOn(quoteErrorApiService, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      quoteConfigServiceGetAuthorIconUrlSpy = jest.spyOn(quoteConfigService, `getAuthorIconUrl`).mockImplementation();
    });

    it(`should fetch a random quote`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(new Error(`fetchRandomQuote error`));

      expect(quoteRandomServiceFetchRandomQuoteSpy).toHaveBeenCalledTimes(1);
      expect(quoteRandomServiceFetchRandomQuoteSpy).toHaveBeenCalledWith(`dummy-id`);
    });

    describe(`when the random quote failed to be fetched`, (): void => {
      beforeEach((): void => {
        quoteRandomServiceFetchRandomQuoteSpy.mockRejectedValue(new Error(`fetchRandomQuote error`));
      });

      it(`should send an error to the Sonia discord error channel`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`fetchRandomQuote error`)
        );

        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
          new Error(`fetchRandomQuote error`),
          anyDiscordMessage
        );
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
          new Error(`fetchRandomQuote error`)
        );
      });
    });

    describe(`when the random quote was successfully fetched`, (): void => {
      beforeEach((): void => {
        quoteRandomServiceFetchRandomQuoteSpy.mockResolvedValue(quote);
      });

      describe(`when the random quote fetched is a quote error`, (): void => {
        let quoteErrorApi: IQuoteErrorApi;

        beforeEach((): void => {
          quoteErrorApi = createHydratedMock<IQuoteErrorApi>();

          quoteRandomServiceFetchRandomQuoteSpy.mockResolvedValue(quoteErrorApi);
        });

        it(`should fetch a message response to display the quote error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
            new Error(`getMessageResponse error`)
          );

          expect(quoteErrorApiServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
          expect(quoteErrorApiServiceGetMessageResponseSpy).toHaveBeenCalledWith(quoteErrorApi);
        });

        describe(`when the message response failed to be fetched`, (): void => {
          beforeEach((): void => {
            quoteErrorApiServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse error`));
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.getMessageResponse(anyDiscordMessage)).rejects.toThrow(
              new Error(`getMessageResponse error`)
            );
          });
        });

        describe(`when the message response was successfully fetched`, (): void => {
          let quoteErrorMessageResponse: IDiscordMessageResponse;

          beforeEach((): void => {
            quoteErrorMessageResponse = createHydratedMock<IDiscordMessageResponse>();

            quoteErrorApiServiceGetMessageResponseSpy.mockResolvedValue(quoteErrorMessageResponse);
          });

          it(`should return the message response`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getMessageResponse(anyDiscordMessage);

            expect(result).toStrictEqual(quoteErrorMessageResponse);
          });
        });
      });

      describe(`when the random quote fetched is a quote`, (): void => {
        beforeEach((): void => {
          quoteRandomServiceFetchRandomQuoteSpy.mockResolvedValue(quote);
        });

        it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
          expect.assertions(3);
          quoteConfigServiceGetAuthorIconUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(quoteConfigServiceGetAuthorIconUrlSpy).toHaveBeenCalledTimes(1);
          expect(quoteConfigServiceGetAuthorIconUrlSpy).toHaveBeenCalledWith();
          expect(result.options.embeds?.[0]?.author).toStrictEqual({
            iconURL: IconEnum.ARTIFICIAL_INTELLIGENCE,
            name: quote.authorName,
            url: quote.quoteUrl,
          } as MessageEmbedAuthor);
        });

        it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
          expect.assertions(3);
          quoteConfigServiceGetImageColorSpy.mockReturnValue(ColorEnum.CANDY);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(quoteConfigServiceGetImageColorSpy).toHaveBeenCalledTimes(1);
          expect(quoteConfigServiceGetImageColorSpy).toHaveBeenCalledWith();
          expect(result.options.embeds?.[0]?.color).toStrictEqual(ColorEnum.CANDY);
        });

        it(`should return a Discord message response embed with a description`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(result.options.embeds?.[0]?.description).toStrictEqual(quote.quote);
        });

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
          expect.assertions(1);
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: `dummy-image-url`,
            text: `Enjoy my wisdom`,
          } as MessageEmbedFooter);
        });

        describe(`when the Sonia image url is null`, (): void => {
          beforeEach((): void => {
            discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
          });

          it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getMessageResponse(anyDiscordMessage);

            expect(result.options.embeds?.[0]?.footer).toStrictEqual({
              iconURL: undefined,
              text: `Enjoy my wisdom`,
            } as MessageEmbedFooter);
          });
        });

        describe(`when the Sonia image url is "image-url"`, (): void => {
          beforeEach((): void => {
            discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
          });

          it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getMessageResponse(anyDiscordMessage);

            expect(result.options.embeds?.[0]?.footer).toStrictEqual({
              iconURL: `image-url`,
              text: `Enjoy my wisdom`,
            } as MessageEmbedFooter);
          });
        });

        it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
          expect.assertions(3);
          quoteConfigServiceGetImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(quoteConfigServiceGetImageUrlSpy).toHaveBeenCalledTimes(1);
          expect(quoteConfigServiceGetImageUrlSpy).toHaveBeenCalledWith();
          expect(result.options.embeds?.[0]?.thumbnail).toStrictEqual({
            url: IconEnum.ARTIFICIAL_INTELLIGENCE,
          } as MessageEmbedThumbnail);
        });

        it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
          expect.assertions(2);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(moment(result.options.embeds?.[0]?.timestamp).isValid()).toBe(true);
          expect(moment(result.options.embeds?.[0]?.timestamp).fromNow()).toBe(`a few seconds ago`);
        });

        it(`should return a Discord message response embed with a title`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(result.options.embeds?.[0]?.title).toBe(`Random quote`);
        });

        it(`should return a Discord message response without a response text`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(result.content).toBe(``);
        });
      });
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandQuoteService();
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

      describe(`when the given message is a message with an almost quote command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@quo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-quo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!quo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@quo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-quo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!quo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@quote`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-quote`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!quote`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@quote dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-quote dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!quote dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@q`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-q`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!q`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@q dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-q dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!q dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@QUOTE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-QUOTE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!QUOTE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@QUOTE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-QUOTE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!QUOTE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@Q`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-Q`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!Q`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@Q dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-Q dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!Q dummy`;
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

      describe(`when the given message is a message with an almost quote command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@quo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-quo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!quo`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@quo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-quo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with an almost quote command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!quo dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@quote`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-quote`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!quote`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@quote dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-quote dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!quote dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@QUOTE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-QUOTE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!QUOTE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@QUOTE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-QUOTE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the quote command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!QUOTE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@q`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-q`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!q`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@q dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-q dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!q dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@Q`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-Q`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!Q`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@Q dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(false);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-Q dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCommand(message);

          expect(result).toBe(true);
        });
      });

      describe(`when the given message is a message with the shortcut quote command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!Q dummy`;
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
