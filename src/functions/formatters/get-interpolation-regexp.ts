import _ from 'lodash';
import xregexp from 'xregexp';

/**
 * @param value
 */
export function getInterpolationRegexp(value: Readonly<string>): RegExp {
  return xregexp(`{{\\s?${_.toLower(value)}\\s?}}`, `gim`);
}
