import _ from "lodash";

export function toBoolean(
  value: Readonly<boolean | string | null | undefined>,
  asFallback: Readonly<boolean> = true
): boolean {
  if (_.isString(value)) {
    if (_.isEqual(_.toLower(value), `true`)) {
      return true;
    } else if (_.isEqual(_.toLower(value), `false`)) {
      return true;
    }
  }

  if (_.isBoolean(value)) {
    return value;
  }

  return asFallback;
}
