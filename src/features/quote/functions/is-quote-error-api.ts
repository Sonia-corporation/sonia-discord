import { IObject } from '../../../types/object';
import { IQuoteErrorApi } from '../interfaces/quote-error-api';
import _ from 'lodash';

/**
 * @description
 * Check if the given quote is either an object or a quote error from the API.
 * @param   {IObject | IQuoteErrorApi} quote The quote to check.
 * @returns {boolean}                        Returns true if the given quote contains an "error_code" property.
 */
export function isQuoteErrorApi(quote: IObject | IQuoteErrorApi): quote is IQuoteErrorApi {
  return _.has(quote, `error_code`);
}
