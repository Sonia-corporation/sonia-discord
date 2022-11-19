import xregexp from 'xregexp';

/**
 * @description
 * From a release block.
 * Extract all the rows.
 * Useful to count them after.
 * @returns {RegExp} The regexp to use.
 */
export function getReleaseTypeBlockRowsRegexp(): RegExp {
  return xregexp(`(?<=:__\\n)(.|\\n)*`, `gim`);
}
