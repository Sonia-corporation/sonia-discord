import _ from 'lodash';

export function isUnknown(value: string): boolean {
  return _.isEqual(_.toLower(value), `unknown`);
}
