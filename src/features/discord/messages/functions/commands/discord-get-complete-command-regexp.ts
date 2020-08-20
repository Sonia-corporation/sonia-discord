import xregexp from "xregexp";
import { IDiscordGetCompleteCommandRegexp } from "../../interfaces/commands/discord-get-complete-command-regexp";

/**
 * @param {Readonly<IDiscordGetCompleteCommandRegexp>} data The data used as a command
 *
 * @return {RegExp} A RegExp matching a prefix with a command and one argument
 */
export function discordGetCompleteCommandRegexp({
  prefix,
  command,
}: Readonly<IDiscordGetCompleteCommandRegexp>): RegExp {
  return xregexp(
    `
    (?<prefix>\\${prefix})                     # Command prefix
    (?<command>${command})                     # Command name
    (?<separator>\\s)                          # Space
    (?<argument1>\\w+)                         # Argument 1
    (?<flagsSeparator>\\s){0,1}                # Space
    (?<flags>-{1,2}\\w+(\\=\\w+\\s?|\\s?)){0,} # Flags
    `,
    `gimx`
  );
}
