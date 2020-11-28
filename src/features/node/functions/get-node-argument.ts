import { getArgumentIndex } from './get-argument-index';
import { getNodeArgumentByIndex } from './get-node-argument-by-index';
import { hasCommandLineArguments } from './has-command-line-arguments';

/**
 * @param name
 */
export function getNodeArgument(name: Readonly<string>): unknown | null {
  if (!hasCommandLineArguments()) {
    return null;
  }

  const argumentIndex: number = getArgumentIndex(name);

  return getNodeArgumentByIndex(argumentIndex);
}
