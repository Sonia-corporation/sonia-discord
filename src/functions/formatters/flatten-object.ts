import _ from "lodash";
import { IObject } from "../../types/object";

function flatten(
  object: Readonly<IObject> | Readonly<string>[] | Readonly<unknown>,
  path: Readonly<string>[] = []
): IObject {
  if (!_.isObject(object)) {
    return { [path.join(`.`)]: object };
  }

  return _.reduce(
    object,
    (
      cum: Readonly<IObject>,
      next: Readonly<unknown>,
      key: Readonly<string>
    ): IObject => _.merge(cum, flatten(next, [...path, key])),
    {}
  );
}

export function flattenObject(object: Readonly<IObject<unknown>>): IObject {
  return flatten(object);
}
