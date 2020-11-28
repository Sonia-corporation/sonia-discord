import xregexp from 'xregexp';

/**
 * @param value
 */
export function getLastSequenceRegexp(value: Readonly<string>): RegExp {
  return xregexp(`(${value})(?!.*(${value}))`, `gim`);
}
