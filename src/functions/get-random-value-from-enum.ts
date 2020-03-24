import _ from 'lodash';

export function getRandomValueFromEnum<E>(enumeration: { [ s: string ]: E } | ArrayLike<E>): E {
  return _.sample(Object.values(enumeration)) as E;
}
