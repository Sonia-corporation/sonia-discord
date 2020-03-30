export function addDiscordDevPrefix(message: Readonly<string>): string {
  return `**[dev]** ${message}`;
}
