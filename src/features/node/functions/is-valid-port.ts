import _ from 'lodash';

export function isValidPort(port: unknown): port is string | number {
  return !_.isNil(port) && !_.isEmpty(port) && (_.isString(port) || _.isNumber(port));
}
