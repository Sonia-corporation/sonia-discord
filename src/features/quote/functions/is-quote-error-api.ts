import { IObject } from '../../../types/object';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import _ from 'lodash';

/**
 * @param quote
 */
export function isQuoteErrorApi(quote: Readonly<IObject | IQuoteErrorApi>): quote is IQuoteErrorApi {
  return _.has(quote, `error_code`);
}
