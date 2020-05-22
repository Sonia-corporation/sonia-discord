import _ from "lodash";

export function isValidPort(port: undefined): false;
export function isValidPort(port: null): false;
// eslint-disable-next-line @typescript-eslint/naming-convention
export function isValidPort(port: boolean): false;
export function isValidPort(port: string): port is string;
export function isValidPort(port: number): port is number;
export function isValidPort(port: unknown): port is string | number;
export function isValidPort(port: unknown): port is string | number {
  if (!_.isNil(port)) {
    if (_.isFinite(port)) {
      return true;
    } else if (_.isString(port) && !_.isEmpty(port)) {
      return true;
    }
  }

  return false;
}
