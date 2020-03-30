import _ from "lodash";

export function isValidArgumentIndex(
  argumentIndex: Readonly<number>
): argumentIndex is number {
  return _.isFinite(argumentIndex) && _.gte(argumentIndex, 0);
}
