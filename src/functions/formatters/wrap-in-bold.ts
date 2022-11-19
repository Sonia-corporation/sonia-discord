import _ from 'lodash';

/**
 * @param value
 */
export function wrapInBold<T = string>(value: T): string {
  return `**${_.toString(value)}**`;
}
