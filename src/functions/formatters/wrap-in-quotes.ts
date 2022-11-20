import _ from 'lodash';

export function wrapInQuotes<T = string>(value: T, quotes = `"`): string {
  return `${quotes}${_.toString(value)}${quotes}`;
}
