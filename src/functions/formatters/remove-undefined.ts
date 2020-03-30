import _ from "lodash";

export function removeUndefined<T>(array: (T | undefined)[]): T[] {
  return _.without(array, undefined) as T[];
}
