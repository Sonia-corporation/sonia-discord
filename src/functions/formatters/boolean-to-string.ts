export function booleanToString(isTrue: Readonly<boolean>): `true` | `false` {
  return isTrue === true ? `true` : `false`;
}
