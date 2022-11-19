import _ from 'lodash';
import moment, { MomentInput } from 'moment-timezone';

/**
 * @param date
 * @param isCapitalized
 */
export function fromNow(date: MomentInput, isCapitalized = true): string {
  const newDate: string = moment(date, moment.ISO_8601).fromNow();

  if (_.isEqual(isCapitalized, true)) {
    return _.capitalize(newDate);
  }

  return newDate;
}
