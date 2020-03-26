export function booleanToString(value: Readonly<boolean>): `true` | `false` {
  return value === true ? `true` : `false`;
}
