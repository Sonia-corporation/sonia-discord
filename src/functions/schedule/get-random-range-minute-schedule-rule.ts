import _ from "lodash";

function isCurrentMinuteExceeded(currentMinute: Readonly<number>): boolean {
  return _.gt(currentMinute, 59);
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
    return randomMinute + 1;
  }

  return randomMinute;
}

function getSafeMinutesRange(minutesRange: Readonly<string>): string {
  return minutesRange.slice(0, -1);
}

function canIncreaseRange(currentMinute: Readonly<number>): boolean {
  return !_.isEqual(currentMinute, -1);
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
  if (_.lt(value, 0)) {
    return `${valueName} interval should be greater or equal to 0`;
  } else if (_.gt(value, 59)) {
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
 * @param {Readonly<number>>} minimumInterval Minimum interval range
 * @param {Readonly<number>>} maximumInterval Maximal interval range
 *
 * @example
 * 8,16,24,32,58 * * * *
 *
 * @returns {string} A schedule rule for minutes only as a range of minutes
 */
export function getRandomRangeMinuteScheduleRule(
  minimumInterval: Readonly<number> = 5,
  maximumInterval: Readonly<number> = 30
): string | never {
  const error: string | undefined = getError(minimumInterval, maximumInterval);

  if (!_.isNil(error)) {
    throw new Error(error);
  }

  let minutesRange = ``;
  let currentMinute = 0;

  while (canIncreaseRange(currentMinute)) {
    currentMinute = getRandomMinute(
      minimumInterval,
      maximumInterval,
      currentMinute
    );

    if (isCurrentMinuteExceeded(currentMinute)) {
      currentMinute = -1;
      minutesRange = getSafeMinutesRange(minutesRange);
    } else {
      minutesRange = addMinuteInRange(currentMinute, minutesRange);
    }
  }

  return `${minutesRange} * * * *`;
}
