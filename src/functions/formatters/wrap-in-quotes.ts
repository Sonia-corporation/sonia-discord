export function wrapInQuotes<T = string>(
  value: Readonly<T>,
  quotes: Readonly<string> = `"`
): string {
  return `${quotes}${value}${quotes}`;
}
