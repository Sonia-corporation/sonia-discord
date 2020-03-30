export function addDiscordDevPrefix(
  name: Readonly<string>,
  message: Readonly<string>
): string {
  return `**[dev - ${name}]** ${message}`;
}
