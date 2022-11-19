import xregexp from 'xregexp';

export function getLastSequenceRegexp(value: string): RegExp {
  return xregexp(`(${value})(?!.*(${value}))`, `gim`);
}
