import _ from "lodash";

export function isExistingArgument(argumentIndex: Readonly<number>): boolean {
  return _.lte(argumentIndex, _.subtract(_.size(process.argv), 1));
}
