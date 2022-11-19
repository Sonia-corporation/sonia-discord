import { getInterpolationRegexp } from './get-interpolation-regexp';
import { IObject } from '../../types/object';
import _ from 'lodash';

export function replaceInterpolation(text: string, replacement: IObject): string {
  return _.reduce(
    replacement,
    (updatedText: string, value: unknown, key: string): string =>
      _.replace(updatedText, getInterpolationRegexp(key), _.toString(value)),
    text
  );
}
