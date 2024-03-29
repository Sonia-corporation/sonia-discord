import { getArgumentIndex } from './get-argument-index';
import { getNodeArgumentByIndex } from './get-node-argument-by-index';
import { hasCommandLineArguments } from './has-command-line-arguments';

export function getNodeArgument(name: string): unknown | null {
  if (!hasCommandLineArguments()) {
    return null;
  }

  const argumentIndex: number = getArgumentIndex(name);

  return getNodeArgumentByIndex(argumentIndex);
}
