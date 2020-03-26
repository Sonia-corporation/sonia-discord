import _ from 'lodash';
import { getArgumentIndex } from './get-argument-index';
import { hasCommandLineArguments } from './has-command-line-arguments';
import { isExistingArgument } from './is-existing-argument';
import { isValidArgumentIndex } from './is-valid-argument-index';

export function getNodeArgument(name: Readonly<string>): unknown | null {
  if (hasCommandLineArguments()) {
    const argumentIndex: number = getArgumentIndex(name);

    if (isValidArgumentIndex(argumentIndex)) {
      const originArgumentValueIndex: number = _.add(argumentIndex, 1);

      if (isExistingArgument(originArgumentValueIndex)) {
        return process.argv[ originArgumentValueIndex ];
      }
    }
  }

  return null;
}
