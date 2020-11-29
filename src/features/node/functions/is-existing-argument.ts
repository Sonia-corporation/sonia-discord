import _ from 'lodash';

const ONE_ARGUMENT_INDEX = 1;

/**
 * @param argumentIndex
 */
export function isExistingArgument(argumentIndex: Readonly<number>): boolean {
  return _.lte(argumentIndex, _.subtract(_.size(process.argv), ONE_ARGUMENT_INDEX));
}
