import { AssertionError } from 'assert';
import _ from 'lodash';

export function assertIsUndefined(value: unknown): asserts value is undefined {
  if (!_.isUndefined(value)) {
    throw new AssertionError({
      message: `not undefined`
    });
  }
}
