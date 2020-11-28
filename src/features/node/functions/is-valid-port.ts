import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function isValidPort(port: undefined | null | boolean): false;
export function isValidPort(port: string): port is string;
export function isValidPort(port: number): port is number;
export function isValidPort(port: unknown): port is string | number;
/**
 * @param port
 */
export function isValidPort(port: unknown): port is string | number {
  if (_.isNil(port)) {
    return false;
  }

  if (_.isFinite(port)) {
    return true;
  } else if (_.isString(port) && !_.isEmpty(port)) {
    return true;
  }

  return false;
}
