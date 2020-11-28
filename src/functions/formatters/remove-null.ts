import _ from 'lodash';

/**
 * @description
 * Remove all null values in an array
 *
 * @param {[]} array An array with potential null values
 *
 * @returns {[]} The given array but without null values
 */
export function removeNull<T = unknown>(array: readonly (T | null)[]): T[] {
  return _.without(array, null) as T[];
}
