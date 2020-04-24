import moment from "moment-timezone";

export function isValidDate(date: Readonly<string>): boolean {
  return moment(date, moment.ISO_8601).isValid();
}
