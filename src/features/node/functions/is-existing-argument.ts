import _ from 'lodash';

const ONE_ARGUMENT_INDEX = 1;

export function isExistingArgument(argumentIndex: number): boolean {
  return _.lte(argumentIndex, _.subtract(_.size(process.argv), ONE_ARGUMENT_INDEX));
}
