import { QuoteApiService } from './quote-api.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { LoggerService } from '../../logger/services/logger.service';
import { isQuoteErrorApi } from '../functions/is-quote-error-api';
import { IQuote } from '../interfaces/quote';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class QuoteRandomService extends AbstractService {
  private static _instance: QuoteRandomService;

  public static getInstance(): QuoteRandomService {
    if (_.isNil(QuoteRandomService._instance)) {
      QuoteRandomService._instance = new QuoteRandomService();
    }

    return QuoteRandomService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.QUOTE_RANDOM_SERVICE);
  }

  public fetchRandomQuote(messageId: Snowflake): Promise<IQuote | IQuoteErrorApi> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(messageId, `fetching a random quote...`),
    });

    return QuoteApiService.getInstance()
      .getQuoteOfTheDay(messageId)
      .then((quote: IQuoteOfTheDayApi | IQuoteErrorApi): IQuote | IQuoteErrorApi =>
        this._quoteOfTheDayApiToQuote(quote)
      );
  }

  private _quoteOfTheDayApiToQuote(quote: IQuoteOfTheDayApi | IQuoteErrorApi): IQuote | IQuoteErrorApi {
    if (isQuoteErrorApi(quote)) {
      return quote;
    }

    return {
      authorName: quote.quote.author,
      date: quote.qotd_date,
      quote: quote.quote.body,
      quoteUrl: quote.quote.url,
    };
  }
}
