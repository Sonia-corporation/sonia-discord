import _ from 'lodash';

/**
 * @param array
 */
export function removeUndefined<T = unknown>(array: readonly (T | undefined)[]): T[] {
  return _.without(array, undefined) as T[];
}
