import _ from "lodash";

export function getRandomValueFromEnum<E>(
  enumeration: { [s: string]: E } | ArrayLike<E>
): E | undefined {
  return _.sample(Object.values(enumeration)) as E;
}
