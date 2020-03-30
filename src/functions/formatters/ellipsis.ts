import _ from "lodash";

export function ellipsis(
  value: Readonly<string>,
  limit: Readonly<number> = 1024,
  suffix: Readonly<string> = `...`
): string {
  return _.truncate(value, {
    length: limit,
    omission: suffix,
  });
}
