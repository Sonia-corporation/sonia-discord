import _ from "lodash";
import xregexp from "xregexp";

export function getInterpolationRegexp(value: Readonly<string>): RegExp {
  return xregexp(`{{\\s?${_.toLower(value)}\\s?}}`, `gim`);
}
