import { IDiscordGetCommandRegexp } from "../../interfaces/commands/discord-get-command-regexp";
import xregexp from "xregexp";

/**
 * @param {Readonly<IDiscordGetCommandRegexp>} data The data used as a command
 *
 * @return {RegExp} A RegExp matching a prefix with a command
 */
export function discordGetCommandRegexp({
  prefix,
  command,
}: Readonly<IDiscordGetCommandRegexp>): RegExp {
  return xregexp(
    `
    (?<prefix>\\${prefix}) # Command prefix
    (?<command>${command}) # Command name
    (?=$|\\s)                   # End of the message or space after the command name (required for shortcuts like help and h)
    `,
    `gimx`
  );
}
