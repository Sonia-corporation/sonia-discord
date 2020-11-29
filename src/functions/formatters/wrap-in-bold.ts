import _ from 'lodash';

/**
 * @param value
 */
export function wrapInBold<T = string>(value: Readonly<T>): string {
  return `**${_.toString(value)}**`;
}
