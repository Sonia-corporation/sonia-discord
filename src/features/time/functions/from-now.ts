import _ from "lodash";
import moment from "moment-timezone";

export function fromNow<T = string>(
  date: Readonly<T>,
  isCapitalized: Readonly<boolean> = true
): string {
  const newDate: string = moment(date, moment.ISO_8601).fromNow();

  if (_.isEqual(isCapitalized, true)) {
    return _.capitalize(newDate);
  }

  return newDate;
}
