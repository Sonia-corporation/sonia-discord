export function wrapInQuotes(
  value: Readonly<string>,
  quotes: Readonly<string> = `"`
): string {
  return `${quotes}${value}${quotes}`;
}
