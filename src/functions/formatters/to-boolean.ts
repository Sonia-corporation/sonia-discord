import _ from 'lodash';

export function toBoolean(isTrue: true | 'true', asFallback?: boolean): true;
export function toBoolean(isTrue: false | 'false', asFallback?: boolean): false;
export function toBoolean(isTrue: null, asFallback: true): true;
export function toBoolean(isTrue: null | undefined, asFallback: false): false;
export function toBoolean(isTrue: undefined, asFallback?: true): true;
export function toBoolean(isTrue: boolean | string | null | undefined, asFallback?: boolean): boolean;
export function toBoolean(isTrue: boolean | string | null | undefined, asFallback = true): boolean {
  if (_.isString(isTrue)) {
    if (_.isEqual(_.toLower(isTrue), `true`)) {
      return true;
    } else if (_.isEqual(_.toLower(isTrue), `false`)) {
      return false;
    }
  }

  if (_.isBoolean(isTrue)) {
    return isTrue;
  }

  return asFallback;
}
