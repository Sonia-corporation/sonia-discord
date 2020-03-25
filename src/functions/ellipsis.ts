import _ from 'lodash';

export function ellipsis(
  value: Readonly<string>,
  limit: Readonly<number> = 1024
): string {
  return _.truncate(value, {
    length: limit,
    omission: `...`
  });
}
