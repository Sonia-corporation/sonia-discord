import { AssertionError } from 'assert';
import _ from 'lodash';

export function assertIsNull(value: unknown): asserts value is null {
  if (!_.isNull(value)) {
    throw new AssertionError({
      message: `not null`
    });
  }
}
