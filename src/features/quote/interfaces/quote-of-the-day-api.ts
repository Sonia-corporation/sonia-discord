import { IObject } from '../../../types/object';

/**
 * @description
 * GET /api/qotd
 */
export interface IQuoteOfTheDayApi extends IObject {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  qotd_date: Date;
  quote: {
    author: string;
    body: string;
    url: string;
  };
}
