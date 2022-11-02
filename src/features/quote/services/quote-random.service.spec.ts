import { QuoteApiService } from './quote-api.service';
import { QuoteRandomService } from './quote-random.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ILoggerLog } from '../../logger/interfaces/logger-log';
import { LoggerService } from '../../logger/services/logger.service';
import { IQuote } from '../interfaces/quote';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import { Snowflake } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`QuoteRandomService`, (): void => {
  let service: QuoteRandomService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let quoteApiService: QuoteApiService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    quoteApiService = QuoteApiService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a QuoteRandom service`, (): void => {
      expect.assertions(1);

      service = QuoteRandomService.getInstance();

      expect(service).toStrictEqual(expect.any(QuoteRandomService));
    });

    it(`should return the created QuoteRandom service`, (): void => {
      expect.assertions(1);

      const result = QuoteRandomService.getInstance();

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

    it(`should notify the QuoteRandom service creation`, (): void => {
      expect.assertions(2);

      service = new QuoteRandomService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.QUOTE_RANDOM_SERVICE);
    });
  });

  describe(`fetchRandomQuote()`, (): void => {
    let messageId: Snowflake;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let quoteApiServiceGetQuoteOfTheDaySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new QuoteRandomService();
      messageId = `dummy-message-id`;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      quoteApiServiceGetQuoteOfTheDaySpy = jest
        .spyOn(quoteApiService, `getQuoteOfTheDay`)
        .mockRejectedValue(new Error(`getQuoteOfTheDay error`));
    });

    it(`should log about fetching the random quote`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.fetchRandomQuote(messageId)).rejects.toThrow(new Error(`getQuoteOfTheDay error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledOnce();
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `QuoteRandomService`,
        hasExtendedContext: true,
        message: `context-[dummy-message-id] text-fetching a random quote...`,
      } as ILoggerLog);
    });

    it(`should call the API to get the quote of the day`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.fetchRandomQuote(messageId)).rejects.toThrow(new Error(`getQuoteOfTheDay error`));

      expect(quoteApiServiceGetQuoteOfTheDaySpy).toHaveBeenCalledOnce();
      expect(quoteApiServiceGetQuoteOfTheDaySpy).toHaveBeenCalledWith(messageId);
    });

    describe(`when the API call failed`, (): void => {
      beforeEach((): void => {
        quoteApiServiceGetQuoteOfTheDaySpy.mockRejectedValue(new Error(`getQuoteOfTheDay error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.fetchRandomQuote(messageId)).rejects.toThrow(new Error(`getQuoteOfTheDay error`));
      });
    });

    describe(`when the API call succeeded`, (): void => {
      let quoteOfTheDayApi: IQuoteOfTheDayApi;

      beforeEach((): void => {
        quoteOfTheDayApi = createHydratedMock<IQuoteOfTheDayApi>();

        quoteApiServiceGetQuoteOfTheDaySpy.mockResolvedValue(quoteOfTheDayApi);
      });

      describe(`when the response is the quote of the day`, (): void => {
        beforeEach((): void => {
          quoteOfTheDayApi = createHydratedMock<IQuoteOfTheDayApi>();

          quoteApiServiceGetQuoteOfTheDaySpy.mockResolvedValue(quoteOfTheDayApi);
        });

        it(`should return the quote`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.fetchRandomQuote(messageId);

          expect(result).toStrictEqual({
            authorName: quoteOfTheDayApi.quote.author,
            date: quoteOfTheDayApi.qotd_date,
            quote: quoteOfTheDayApi.quote.body,
            quoteUrl: quoteOfTheDayApi.quote.url,
          } as IQuote);
        });
      });

      describe(`when the response is an error`, (): void => {
        let quoteErrorApi: IQuoteErrorApi;

        beforeEach((): void => {
          quoteErrorApi = createHydratedMock<IQuoteErrorApi>();

          quoteApiServiceGetQuoteOfTheDaySpy.mockResolvedValue(quoteErrorApi);
        });

        it(`should return the quote error`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.fetchRandomQuote(messageId);

          expect(result).toStrictEqual(quoteErrorApi);
        });
      });
    });
  });
});
