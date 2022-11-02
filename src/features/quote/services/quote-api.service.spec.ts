import { QuoteConfigService } from './config/quote-config.service';
import { QuoteApiService } from './quote-api.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { CoreEventService } from '../../core/services/core-event.service';
import { ILoggerLog } from '../../logger/interfaces/logger-log';
import { LoggerService } from '../../logger/services/logger.service';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Snowflake } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../logger/services/chalk/chalk.service`);

describe(`QuoteApiService`, (): void => {
  let service: QuoteApiService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let quoteConfigService: QuoteConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    quoteConfigService = QuoteConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a QuoteApi service`, (): void => {
      expect.assertions(1);

      service = QuoteApiService.getInstance();

      expect(service).toStrictEqual(expect.any(QuoteApiService));
    });

    it(`should return the created QuoteApi service`, (): void => {
      expect.assertions(1);

      const result = QuoteApiService.getInstance();

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

    it(`should notify the QuoteApi service creation`, (): void => {
      expect.assertions(2);

      service = new QuoteApiService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.QUOTE_API_SERVICE);
    });
  });

  describe(`getQuoteOfTheDay()`, (): void => {
    let messageId: Snowflake;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let axiosGetSpy: jest.SpyInstance;
    let quoteConfigServiceGetApiKeySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new QuoteApiService();
      messageId = `dummy-message-id`;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      axiosGetSpy = jest.spyOn(axios, `get`).mockRejectedValue(new Error(`get error`));
      quoteConfigServiceGetApiKeySpy = jest.spyOn(quoteConfigService, `getApiKey`).mockImplementation();
    });

    it(`should log about calling the API`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.getQuoteOfTheDay(messageId)).rejects.toThrow(new Error(`get error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledOnce();
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `QuoteApiService`,
        hasExtendedContext: true,
        message: `context-[dummy-message-id] text-calling value-https://favqs.com/api/qotd endpoint`,
      } as ILoggerLog);
    });

    it(`should call the quote of the day endpoint`, async (): Promise<void> => {
      expect.assertions(3);
      quoteConfigServiceGetApiKeySpy.mockReturnValue(`dummy-api-key`);

      await expect(service.getQuoteOfTheDay(messageId)).rejects.toThrow(new Error(`get error`));

      expect(axiosGetSpy).toHaveBeenCalledOnce();
      expect(axiosGetSpy).toHaveBeenCalledWith(`https://favqs.com/api/qotd`, {
        headers: {
          'accept': `application/vnd.favqs.v2+json;`,
          'authorization': `Token token="dummy-api-key"`,
          'content-type': `application/json`,
        },
      } as AxiosRequestConfig);
    });

    describe(`when the call to the API failed`, (): void => {
      beforeEach((): void => {
        axiosGetSpy.mockRejectedValue(new Error(`get error`));
      });

      it(`should log about the error`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getQuoteOfTheDay(messageId)).rejects.toThrow(new Error(`get error`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledOnce();
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `QuoteApiService`,
          hasExtendedContext: true,
          message: `context-[dummy-message-id] text-value-https://favqs.com/api/qotd endpoint failed`,
        } as ILoggerLog);
      });

      it(`should throw the error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getQuoteOfTheDay(messageId)).rejects.toThrow(new Error(`get error`));
      });
    });

    describe(`when the call to the API succeeded`, (): void => {
      let axiosResponse: AxiosResponse<IQuoteOfTheDayApi>;

      beforeEach((): void => {
        axiosResponse = createHydratedMock<AxiosResponse<IQuoteOfTheDayApi>>({
          data: {
            quote: {
              url: `dummy-url`,
            },
          },
        });

        axiosGetSpy.mockResolvedValue(axiosResponse);
      });

      it(`should log about calling the API successfully`, async (): Promise<void> => {
        expect.assertions(2);

        await service.getQuoteOfTheDay(messageId);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `QuoteApiService`,
          hasExtendedContext: true,
          message: `context-[dummy-message-id] text-value-https://favqs.com/api/qotd endpoint succeeded`,
        } as ILoggerLog);
      });

      it(`should return the response from the API`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getQuoteOfTheDay(messageId);

        expect(result).toStrictEqual(axiosResponse.data);
      });
    });
  });
});
