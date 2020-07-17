import _ from "lodash";

// @todo fix valid-jsdoc error (dunno what is wrong)
// eslint-disable-next-line valid-jsdoc
/**
 * @description
 * Create a schedule rule for minutes only as a range of minutes
 *
 * @param {Readonly<number>>} minimumInterval Minimum interval range
 * @param {Readonly<number>>} maximumInterval Maximal interval range
 *
 * @todo enhance with safe fallback with extreme values like:
 * - minimumInterval being lower than 1
 * - maximumInterval being greater than 59
 * - minimumInterval being greater than maximumInterval
 *
 * @example
 * 8,16,24,32,58 * * * *
 *
 * @returns {string} A schedule rule for minutes only as a range of minutes
 */
export function getRandomRangeMinuteScheduleRule(
  minimumInterval: Readonly<number> = 5,
  maximumInterval: Readonly<number> = 30
): string {
  let minutesRange = ``;
  let currentMinute = 0;

  while (!_.isEqual(currentMinute, -1)) {
    currentMinute =
      _.random(minimumInterval, maximumInterval, false) + currentMinute;

    if (_.gt(currentMinute, 59)) {
      currentMinute = -1;
      minutesRange = minutesRange.slice(0, -1);
    } else {
      minutesRange = `${minutesRange}${currentMinute},`;
    }
  }

  return `${minutesRange} * * * *`;
}
