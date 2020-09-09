import xregexp from "xregexp";

export function getLastSequenceRegexp(value: Readonly<string>): RegExp {
  return xregexp(`(${value})(?!.*(${value}))`, `gim`);
}
