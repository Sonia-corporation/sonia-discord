import { IDiscordGetCommandRegexp } from "../../interfaces/commands/discord-get-command-regexp";
import xregexp from "xregexp";

export function discordGetCommandRegexp(
  data: Readonly<IDiscordGetCommandRegexp>
): RegExp {
  return xregexp(
    `
    (?<prefix>\\${data.prefix}) # Command prefix
    (?<command>${data.command}) # Command name
    (?<separator>\\s)           # Space
    (?<argument1>\\S+)          # Argument 1
    `,
    `gimx`
  );
}
