import moment from "moment";
import { isUnknown } from "./is-unknown";

export function isValidDate(date: Readonly<string>): boolean {
  return !isUnknown(date) && moment(date).isValid();
}
