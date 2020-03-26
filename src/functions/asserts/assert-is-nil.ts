import { AssertionError } from 'assert';
import _ from 'lodash';

export function assertIsNil(value: unknown): asserts value is null | undefined {
  if (!_.isNull(value)) {
    throw new AssertionError({
      message: `not null`
    });
  } else if (!_.isUndefined(value)) {
    throw new AssertionError({
      message: `not undefined`
    });
  }
}
