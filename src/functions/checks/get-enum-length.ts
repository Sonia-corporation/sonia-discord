import { IObject } from '../../types/object';
import _ from 'lodash';

export function getEnumLength(enumeration: IObject): number {
  return _.size(_.keys(enumeration));
}
