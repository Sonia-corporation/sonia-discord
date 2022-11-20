import { isExistingArgument } from './is-existing-argument';
import { isValidArgumentIndex } from './is-valid-argument-index';
import _ from 'lodash';

const ONE_ARGUMENT_INDEX = 1;

export function getNodeArgumentByIndex(argumentIndex: number): unknown | null {
  if (!isValidArgumentIndex(argumentIndex)) {
    return null;
  }

  const originArgumentValueIndex: number = _.add(argumentIndex, ONE_ARGUMENT_INDEX);

  if (!isExistingArgument(originArgumentValueIndex)) {
    return null;
  }

  return process.argv[originArgumentValueIndex];
}
