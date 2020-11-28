import { IObject } from '../../types/object';
import _ from 'lodash';

/**
 * @description
 * Return the length of the given string enumeration
 *
 * @param {Readonly<IObject<string>>} enumeration The enumeration
 *
 * @returns {number} The length of the given enumeration
 */
export function getStringEnumLength(enumeration: Readonly<IObject<string>>): number {
  return _.size(_.keys(enumeration));
}
