import _ from 'lodash';

export function wrapInQuotes<T = string>(value: Readonly<T>, quotes: Readonly<string> = `"`): string {
  return `${quotes}${_.toString(value)}${quotes}`;
}
