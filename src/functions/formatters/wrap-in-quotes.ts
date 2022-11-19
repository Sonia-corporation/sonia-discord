import _ from 'lodash';

/**
 * @param value
 * @param quotes
 */
export function wrapInQuotes<T = string>(value: T, quotes = `"`): string {
  return `${quotes}${_.toString(value)}${quotes}`;
}
