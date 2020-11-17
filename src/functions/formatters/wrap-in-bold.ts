import _ from 'lodash';

export function wrapInBold<T = string>(value: Readonly<T>): string {
  return `**${_.toString(value)}**`;
}
