import _ from "lodash";

// Keep in mind that string enum members do not get a reverse mapping generated at all
// Using other types could lead to having keys as values
export function getRandomValueFromEnum<E>(
  enumeration: { [s: string]: E } | ArrayLike<E>
): E | undefined {
  return _.sample(Object.values(enumeration)) as E;
}
