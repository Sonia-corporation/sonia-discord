import { IObject } from '../../types/object';
import _ from 'lodash';

/**
 * @param object
 * @param path
 */
function flatten(object: IObject | string[] | unknown, path: string[] = []): IObject {
  if (!_.isObject(object)) {
    return { [path.join(`.`)]: object };
  }

  return _.reduce(
    object,
    (cum: IObject, next: unknown, key: string): IObject => _.merge(cum, flatten(next, [...path, key])),
    {}
  );
}

/**
 * @param object
 */
export function flattenObject(object: IObject): IObject {
  return flatten(object);
}
