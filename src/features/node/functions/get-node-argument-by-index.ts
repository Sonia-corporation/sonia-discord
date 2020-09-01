import _ from "lodash";
import { isExistingArgument } from "./is-existing-argument";
import { isValidArgumentIndex } from "./is-valid-argument-index";

const ONE_ARGUMENT_INDEX = 1;

export function getNodeArgumentByIndex(
  argumentIndex: Readonly<number>
): unknown | null {
  if (isValidArgumentIndex(argumentIndex)) {
    const originArgumentValueIndex: number = _.add(
      argumentIndex,
      ONE_ARGUMENT_INDEX
    );

    if (isExistingArgument(originArgumentValueIndex)) {
      return process.argv[originArgumentValueIndex];
    }
  }

  return null;
}
