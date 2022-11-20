import _ from 'lodash';

export function wrapInBold<T = string>(value: T): string {
  return `**${_.toString(value)}**`;
}
