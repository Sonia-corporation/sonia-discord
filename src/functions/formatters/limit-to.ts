import { ellipsis } from "./ellipsis";

export function limitTo(
  value: Readonly<string>,
  limit: Readonly<number> = 1024
): string {
  return ellipsis(value, limit, ``);
}
