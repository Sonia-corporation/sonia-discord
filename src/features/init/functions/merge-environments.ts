import _ from 'lodash';
import { IEnvironment } from '../../../environment/interfaces/environment';

export function mergeEnvironments(
  environmentA: Readonly<IEnvironment>,
  environmentB: Readonly<IEnvironment>
): IEnvironment {
  return _.merge(
    {},
    environmentA,
    environmentB
  );
}
