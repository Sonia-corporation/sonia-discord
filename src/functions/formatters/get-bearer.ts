export function getBearer(token: Readonly<string>): string {
  return `bearer ${token}`;
}
