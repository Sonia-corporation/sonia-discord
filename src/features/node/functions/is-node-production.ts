import { getNodeArgument } from './get-node-argument';
import _ from 'lodash';

export function isNodeProduction(): boolean {
  const prodArgument = getNodeArgument(`prod`);

  if (!_.isString(prodArgument)) {
    return false;
  }

  return _.isEqual(prodArgument, `true`);
}
