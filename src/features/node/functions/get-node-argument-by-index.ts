import _ from "lodash";
import { isExistingArgument } from "./is-existing-argument";
import { isValidArgumentIndex } from "./is-valid-argument-index";

export function getNodeArgumentByIndex(
  argumentIndex: Readonly<number>
): unknown | null {
  if (isValidArgumentIndex(argumentIndex)) {
    const originArgumentValueIndex: number = _.add(argumentIndex, 1);

    if (isExistingArgument(originArgumentValueIndex)) {
      return process.argv[originArgumentValueIndex];
    }
  }

  return null;
}
