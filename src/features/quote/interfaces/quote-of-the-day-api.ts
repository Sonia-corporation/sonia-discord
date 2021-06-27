/**
 * @description
 * GET /api/qotd
 */
export interface IQuoteOfTheDayApi {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  qotd_date: Date;
  quote: {
    author: string;
    body: string;
    url: string;
  };
}
