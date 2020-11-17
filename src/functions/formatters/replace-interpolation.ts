import { getInterpolationRegexp } from './get-interpolation-regexp';
import { IObject } from '../../types/object';
import _ from 'lodash';

export function replaceInterpolation(text: Readonly<string>, replacement: Readonly<IObject>): string {
  return _.reduce(
    replacement,
    (updatedText: Readonly<string>, value: unknown, key: Readonly<string>): string =>
      _.replace(updatedText, getInterpolationRegexp(key), _.toString(value)),
    text
  );
}
