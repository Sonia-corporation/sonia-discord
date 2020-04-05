import _ from "lodash";

export function isValidPort(port: undefined): false;
export function isValidPort(port: null): false;
export function isValidPort(port: boolean): false;
export function isValidPort(port: string): port is string;
export function isValidPort(port: number): port is number;
export function isValidPort(port: unknown): port is string | number;
export function isValidPort(port: unknown): port is string | number {
  return (
    !_.isNil(port) &&
    ((_.isString(port) && !_.isEmpty(port)) || _.isFinite(port))
  );
}
