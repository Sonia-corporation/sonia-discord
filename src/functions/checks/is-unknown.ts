import _ from "lodash";

export function isUnknown(value: Readonly<string>): boolean {
  return _.isEqual(_.toLower(value), `unknown`);
}
