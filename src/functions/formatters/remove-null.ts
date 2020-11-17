import _ from 'lodash';

export function removeNull<T = unknown>(array: (T | null)[]): T[] {
  return _.without(array, null) as T[];
}
