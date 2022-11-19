import { IObject } from '../../types/object';
import _ from 'lodash';

/**
 * @description
 * Return the length of the given enumeration
 * @param {IObject} enumeration The enumeration
 * @returns {number} The length of the given enumeration
 */
export function getEnumLength(enumeration: IObject): number {
  return _.size(_.keys(enumeration));
}
