import _ from 'lodash';

/**
 * @param value
 */
export function isUnknown(value: string): boolean {
  return _.isEqual(_.toLower(value), `unknown`);
}
