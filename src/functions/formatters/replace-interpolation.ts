import { getInterpolationRegexp } from './get-interpolation-regexp';
import { IObject } from '../../types/object';
import _ from 'lodash';

/**
 * @param text
 * @param replacement
 */
export function replaceInterpolation(text: string, replacement: IObject): string {
  return _.reduce(
    replacement,
    (updatedText: string, value: unknown, key: string): string =>
      _.replace(updatedText, getInterpolationRegexp(key), _.toString(value)),
    text
  );
}
