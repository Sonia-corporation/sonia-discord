import _ from "lodash";
import { getNodeArgument } from "./get-node-argument";

export function isNodeProduction(): boolean {
  const prodArgument = getNodeArgument(`prod`);

  if (_.isBoolean(prodArgument)) {
    return prodArgument;
  } else if (_.isString(prodArgument)) {
    return _.isEqual(prodArgument, `true`);
  }

  return false;
}
