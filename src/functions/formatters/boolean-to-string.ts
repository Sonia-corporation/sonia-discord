/**
 * @param isTrue
 */
export function booleanToString(isTrue: boolean): `true` | `false` {
  return isTrue === true ? `true` : `false`;
}
