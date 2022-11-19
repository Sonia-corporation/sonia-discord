import xregexp from 'xregexp';

/**
 * @param value
 */
export function getLastSequenceRegexp(value: string): RegExp {
  return xregexp(`(${value})(?!.*(${value}))`, `gim`);
}
