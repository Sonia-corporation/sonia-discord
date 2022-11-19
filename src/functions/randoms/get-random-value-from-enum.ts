import _ from 'lodash';

/**
 * @description
 * Keep in mind that string enum members do not get a reverse mapping generated at all
 * Using other types could lead to having keys as values
 * @param {Record<string, TValue>} enumeration The enumeration to pick from
 * @returns {TValue | undefined} A random value from the enum
 */
export function getRandomValueFromEnum<TValue = unknown>(enumeration: Record<string, TValue>): TValue | undefined {
  return _.sample(_.values(enumeration)) as TValue;
}
