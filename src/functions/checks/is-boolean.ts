import _ from "lodash";

export function isBoolean(
  value: Readonly<boolean | string | null | undefined>
): boolean {
  if (_.isString(value)) {
    if (_.isEqual(_.toLower(value), `true`)) {
      return true;
    } else if (_.isEqual(_.toLower(value), `false`)) {
      return true;
    }
  }

  return _.isBoolean(value);
}
