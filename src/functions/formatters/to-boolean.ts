import _ from "lodash";

export function toBoolean(isTrue: Readonly<true>): true;
export function toBoolean(
  isTrue: Readonly<true>,
  asFallback: Readonly<true>
): true;
export function toBoolean(
  isTrue: Readonly<true>,
  asFallback: Readonly<false>
): true;
export function toBoolean(isTrue: Readonly<false>): false;
export function toBoolean(
  isTrue: Readonly<false>,
  asFallback: Readonly<true>
): false;
export function toBoolean(
  isTrue: Readonly<false>,
  asFallback: Readonly<false>
): false;
export function toBoolean(isTrue: Readonly<"true">): true;
export function toBoolean(
  isTrue: Readonly<"true">,
  asFallback: Readonly<true>
): true;
export function toBoolean(
  isTrue: Readonly<"true">,
  asFallback: Readonly<false>
): true;
export function toBoolean(isTrue: Readonly<"false">): false;
export function toBoolean(
  isTrue: Readonly<"false">,
  asFallback: Readonly<true>
): false;
export function toBoolean(
  isTrue: Readonly<"false">,
  asFallback: Readonly<false>
): false;
export function toBoolean(isTrue: Readonly<string>): boolean;
export function toBoolean(
  isTrue: Readonly<string>,
  asFallback: Readonly<boolean>
): boolean;
export function toBoolean(isTrue: Readonly<null>): true;
export function toBoolean(
  isTrue: Readonly<null>,
  asFallback: Readonly<true>
): true;
export function toBoolean(
  isTrue: Readonly<null>,
  asFallback: Readonly<false>
): false;
export function toBoolean(isTrue: Readonly<undefined>): true;
export function toBoolean(
  isTrue: Readonly<undefined>,
  asFallback: Readonly<true>
): true;
export function toBoolean(
  isTrue: Readonly<undefined>,
  asFallback: Readonly<false>
): false;
export function toBoolean(
  isTrue: Readonly<boolean | string | null | undefined>
): boolean;
export function toBoolean(
  isTrue: Readonly<boolean | string | null | undefined>,
  asFallback: Readonly<boolean>
): boolean;
export function toBoolean(
  isTrue: Readonly<boolean | string | null | undefined>,
  asFallback: Readonly<boolean> = true
): boolean {
  if (_.isString(isTrue)) {
    if (_.isEqual(_.toLower(isTrue), `true`)) {
      return true;
    } else if (_.isEqual(_.toLower(isTrue), `false`)) {
      return false;
    }
  }

  if (_.isBoolean(isTrue)) {
    return isTrue;
  }

  return asFallback;
}
