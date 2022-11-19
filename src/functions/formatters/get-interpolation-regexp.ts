import _ from 'lodash';
import xregexp from 'xregexp';

export function getInterpolationRegexp(value: string): RegExp {
  return xregexp(`{{\\s?${_.toLower(value)}\\s?}}`, `gim`);
}
