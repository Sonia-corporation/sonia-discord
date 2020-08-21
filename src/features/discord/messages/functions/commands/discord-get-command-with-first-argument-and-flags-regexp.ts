import xregexp from "xregexp";
import { IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData } from "../../interfaces/commands/discord-get-command-with-first-argument-and-flags-regexp-data";

/**
 * @description
 * For the flag part it allows:
 * - Shortcut flag (-flag)
 * - Normal flag (--flag)
 * - Value flag (--flag=xxx)
 *
 * @param {Readonly<IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData>} data The data used as a command
 *
 * @return {RegExp} A RegExp matching a prefix with a command, one argument and optional flags
 */
export function discordGetCommandWithFirstArgumentAndFlagsRegexp({
  prefix,
  command,
}: Readonly<IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData>): RegExp {
  return xregexp(
    `
    (?<prefix>\\${prefix})                       # Command prefix
    (?<command>${command})                       # Command name
    (?<separator>\\s)                            # Space
    (?<argument1>\\w+)                           # Argument 1
    (?<flagsSeparator>(\\s){0,1})                # Space
    (?<flags>(-{1,2}\\w+(\\=\\w+\\s?|\\s?)){0,}) # Flags
    `,
    `gimx`
  );
}
