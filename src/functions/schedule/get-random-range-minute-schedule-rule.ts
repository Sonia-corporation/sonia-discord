import _ from 'lodash';

const MAX_MINUTES_IN_ONE_HOUR = 59;
const ONE_MINUTE = 1;
const MINIMUM_MINUTES_IN_ONE_HOUR = 0;
const MINIMAL_RANGE_MINUTES = 5;
const MAXIMUM_RANGE_MINUTES = 30;
const OUTBOUND_MINUTE = -1;
const FROM_START = 0;
const LAST_CHAR = -1;

/**
 * @param currentMinute
 */
function isCurrentMinuteExceeded(currentMinute: number): boolean {
  return _.gt(currentMinute, MAX_MINUTES_IN_ONE_HOUR);
}

/**
 * @param minimumInterval
 * @param maximumInterval
 * @param currentMinute
 */
function getRandomMinute(minimumInterval: number, maximumInterval: number, currentMinute: number): number {
  const randomMinute: number = _.random(minimumInterval, maximumInterval, false) + currentMinute;

  /**
   * Avoid consecutive values like 1,1,1,1 due to the inclusive random from Lodash
   */
  if (_.isEqual(randomMinute, currentMinute)) {
    return randomMinute + ONE_MINUTE;
  }

  return randomMinute;
}

/**
 * @param minutesRange
 */
function getSafeMinutesRange(minutesRange: string): string {
  return minutesRange.slice(FROM_START, LAST_CHAR);
}

/**
 * @param currentMinute
 */
function canIncreaseRange(currentMinute: number): boolean {
  return !_.isEqual(currentMinute, OUTBOUND_MINUTE);
}

/**
 * @param currentMinute
 * @param minutesRange
 */
function addMinuteInRange(currentMinute: number, minutesRange: string): string {
  return `${minutesRange}${_.toString(currentMinute)},`;
}

/**
 * @param minimumInterval
 * @param maximumInterval
 */
function getError(minimumInterval: number, maximumInterval: number): string | undefined {
  const errors: (string | null)[] = [
    getMinimumIntervalError(minimumInterval),
    getMaximumIntervalError(maximumInterval),
    getIntervalError(minimumInterval, maximumInterval),
  ];

  return _.head(_.compact(errors));
}

/**
 * @param minimumInterval
 */
function getMinimumIntervalError(minimumInterval: number): string | null {
  return getOutOfBoundIntervalError(minimumInterval, `Minimum`);
}

/**
 * @param maximumInterval
 */
function getMaximumIntervalError(maximumInterval: number): string | null {
  return getOutOfBoundIntervalError(maximumInterval, `Maximum`);
}

/**
 * @param value
 * @param valueName
 */
function getOutOfBoundIntervalError(value: number, valueName: string): string | null {
  if (_.lt(value, MINIMUM_MINUTES_IN_ONE_HOUR)) {
    return `${valueName} interval should be greater or equal to 0`;
  } else if (_.gt(value, MAX_MINUTES_IN_ONE_HOUR)) {
    return `${valueName} interval should be lower than 60`;
  }

  return null;
}

/**
 * @param minimumInterval
 * @param maximumInterval
 */
function getIntervalError(minimumInterval: number, maximumInterval: number): string | null {
  if (_.isEqual(minimumInterval, maximumInterval)) {
    return `Maximum interval should be greater than minimum interval`;
  }

  return null;
}

// @todo fix valid-jsdoc error (dunno what is wrong)
// eslint-disable-next-line valid-jsdoc
/**
 * @description
 * Create a schedule rule for minutes only as a range of minutes
 * @example
 * 8,16,24,32,58 * * * *
 * @param {number>} [minimumInterval=5] Minimum interval range
 * @param {number>} [maximumInterval=30] Maximal interval range
 * @returns {string} A schedule rule for minutes only as a range of minutes
 */
export function getRandomRangeMinuteScheduleRule(
  minimumInterval: number = MINIMAL_RANGE_MINUTES,
  maximumInterval: number = MAXIMUM_RANGE_MINUTES
): string | never {
  const error: string | undefined = getError(minimumInterval, maximumInterval);

  if (!_.isNil(error)) {
    throw new Error(error);
  }

  let minutesRange = ``;
  let currentMinute = MINIMUM_MINUTES_IN_ONE_HOUR;

  while (canIncreaseRange(currentMinute)) {
    currentMinute = getRandomMinute(minimumInterval, maximumInterval, currentMinute);

    if (isCurrentMinuteExceeded(currentMinute)) {
      currentMinute = OUTBOUND_MINUTE;
      minutesRange = getSafeMinutesRange(minutesRange);
    } else {
      minutesRange = addMinuteInRange(currentMinute, minutesRange);
    }
  }

  return `${minutesRange} * * * *`;
}
