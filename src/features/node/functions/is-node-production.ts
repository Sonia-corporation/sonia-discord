import _ from "lodash";
import { getNodeArgument } from "./get-node-argument";

export function isNodeProduction(): boolean {
  const prodArgument = getNodeArgument(`prod`);

  if (!_.isString(prodArgument)) {
    return false;
  }

  return _.isEqual(prodArgument, `true`);
}
