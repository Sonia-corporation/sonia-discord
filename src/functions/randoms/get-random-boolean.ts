import _ from 'lodash';

/**
 *
 */
export function getRandomBoolean(): boolean {
  const isTrue: boolean | undefined = _.sample([true, false]);

  return _.isNil(isTrue) ? true : isTrue;
}
