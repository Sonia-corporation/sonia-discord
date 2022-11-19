import _ from 'lodash';

const MINIMUM_ARGUMENT_INDEX = 0;

export function isValidArgumentIndex(argumentIndex: number): argumentIndex is number {
  return _.isFinite(argumentIndex) && _.gte(argumentIndex, MINIMUM_ARGUMENT_INDEX);
}
