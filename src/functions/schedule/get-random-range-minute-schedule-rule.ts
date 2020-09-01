import _ from "lodash";

const MAX_MINUTES_IN_ONE_HOUR = 59;
const ONE_MINUTE = 1;
const MINIMUM_MINUTES_IN_ONE_HOUR = 0;
const MINIMAL_RANGE_MINUTES = 5;
const MAXIMUM_RANGE_MINUTES = 30;
const OUTBOUND_MINUTE = -1;
const FROM_START = 0;
const LAST_CHAR = -1;

function isCurrentMinuteExceeded(currentMinute: Readonly<number>): boolean {
  return _.gt(currentMinute, MAX_MINUTES_IN_ONE_HOUR);
}

function getRandomMinute(
  minimumInterval: Readonly<number>,
  maximumInterval: Readonly<number>,
  currentMinute: Readonly<number>
): number {
  const randomMinute: number =
    _.random(minimumInterval, maximumInterval, false) + currentMinute;

  /**
   * Avoid consecutive values like 1,1,1,1 due to the inclusive random from Lodash
   */
  if (_.isEqual(randomMinute, currentMinute)) {
    return randomMinute + ONE_MINUTE;
  }

  return randomMinute;
}

function getSafeMinutesRange(minutesRange: Readonly<string>): string {
  return minutesRange.slice(FROM_START, LAST_CHAR);
}

function canIncreaseRange(currentMinute: Readonly<number>): boolean {
  return !_.isEqual(currentMinute, OUTBOUND_MINUTE);
}

function addMinuteInRange(
  currentMinute: Readonly<number>,
  minutesRange: Readonly<string>
): string {
  return `${minutesRange}${currentMinute},`;
}

function getError(
  minimumInterval: Readonly<number>,
  maximumInterval: Readonly<number>
): string | undefined {
  const errors: (string | null)[] = [
    getMinimumIntervalError(minimumInterval),
    getMaximumIntervalError(maximumInterval),
    getIntervalError(minimumInterval, maximumInterval),
  ];

  return _.head(_.compact(errors));
}

function getMinimumIntervalError(
  minimumInterval: Readonly<number>
): string | null {
  return getOutOfBoundIntervalError(minimumInterval, `Minimum`);
}

function getMaximumIntervalError(
  maximumInterval: Readonly<number>
): string | null {
  return getOutOfBoundIntervalError(maximumInterval, `Maximum`);
}

function getOutOfBoundIntervalError(
  value: Readonly<number>,
  valueName: Readonly<string>
): string | null {
  if (_.lt(value, MINIMUM_MINUTES_IN_ONE_HOUR)) {
    return `${valueName} interval should be greater or equal to 0`;
  } else if (_.gt(value, MAX_MINUTES_IN_ONE_HOUR)) {
    return `${valueName} interval should be lower than 60`;
  }

  return null;
}

function getIntervalError(
  minimumInterval: Readonly<number>,
  maximumInterval: Readonly<number>
): string | null {
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
 *
 * @example
 * 8,16,24,32,58 * * * *
 *
 * @param {Readonly<number>>} [minimumInterval=5] Minimum interval range
 * @param {Readonly<number>>} [maximumInterval=30] Maximal interval range
 *
 * @return {string} A schedule rule for minutes only as a range of minutes
 */
export function getRandomRangeMinuteScheduleRule(
  minimumInterval: Readonly<number> = MINIMAL_RANGE_MINUTES,
  maximumInterval: Readonly<number> = MAXIMUM_RANGE_MINUTES
): string | never {
  const error: string | undefined = getError(minimumInterval, maximumInterval);

  if (!_.isNil(error)) {
    throw new Error(error);
  }

  let minutesRange = ``;
  let currentMinute = MINIMUM_MINUTES_IN_ONE_HOUR;

  while (canIncreaseRange(currentMinute)) {
    currentMinute = getRandomMinute(
      minimumInterval,
      maximumInterval,
      currentMinute
    );

    if (isCurrentMinuteExceeded(currentMinute)) {
      currentMinute = OUTBOUND_MINUTE;
      minutesRange = getSafeMinutesRange(minutesRange);
    } else {
      minutesRange = addMinuteInRange(currentMinute, minutesRange);
    }
  }

  return `${minutesRange} * * * *`;
}
