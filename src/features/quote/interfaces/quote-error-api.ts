import { QuoteErrorApiErrorCodeEnum } from '../enums/quote-error-api-error-code.enum';

export interface IQuoteErrorApi {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  error_code: QuoteErrorApiErrorCodeEnum;
  message: string;
}
