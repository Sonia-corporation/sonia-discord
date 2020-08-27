import _ from "lodash";

// Keep in mind that string enum members do not get a reverse mapping generated at all
// Using other types could lead to having keys as values
export function getRandomValueFromEnum<TValue>(
  enumeration: Record<string, TValue>
): TValue | undefined {
  return _.sample(_.values(enumeration)) as TValue;
}
