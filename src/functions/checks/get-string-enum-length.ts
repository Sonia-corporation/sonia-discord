import { IObject } from '../../types/object';
import _ from 'lodash';

export function getStringEnumLength(enumeration: IObject<string>): number {
  return _.size(_.keys(enumeration));
}
