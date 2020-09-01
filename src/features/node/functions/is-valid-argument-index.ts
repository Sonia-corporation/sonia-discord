import _ from "lodash";

const MINIMUM_ARGUMENT_INDEX = 0;

export function isValidArgumentIndex(
  argumentIndex: Readonly<number>
): argumentIndex is number {
  return (
    _.isFinite(argumentIndex) && _.gte(argumentIndex, MINIMUM_ARGUMENT_INDEX)
  );
}
