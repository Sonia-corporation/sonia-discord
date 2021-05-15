import { QuoteApiService } from './quote-api.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IQuoteOfTheDayApi } from '../interfaces/quote-of-the-day-api';
import { IQuote } from '../interfaces/quote';
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

  public fetchRandomQuote(): Promise<IQuote> {
    return QuoteApiService.getInstance()
      .getQuoteOfTheDay()
      .then(
        (quote: Readonly<IQuoteOfTheDayApi>): IQuote => {
          return {
            authorName: quote.quote.author,
            date: quote.qotd_date,
            quote: quote.quote.body,
            quoteUrl: quote.quote.url,
          };
        }
      );
  }
}
