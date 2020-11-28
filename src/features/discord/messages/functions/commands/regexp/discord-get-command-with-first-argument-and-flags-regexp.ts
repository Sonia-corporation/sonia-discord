import { IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData } from '../../../interfaces/commands/getters/discord-get-command-with-first-argument-and-flags-regexp-data';
import xregexp from 'xregexp';

/**
 * @description
 * For the flag part it allows:
 * - Shortcut flag (-flag)
 * - Normal flag (--flag)
 * - Value flag (--flag=xxx)
 *
 * @param {Readonly<IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData>} data The data used as a command
 *
 * @returns {RegExp} A RegExp matching a prefix with a command, one argument and at least one flag
 */
export function discordGetCommandWithFirstArgumentAndFlagsRegexp({
  prefix,
  command,
}: Readonly<IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData>): RegExp {
  return xregexp(
    `
    (?<prefix>\\${prefix})                                           # Command prefix
    (?<command>${command})                                           # Command name
    (?<separator>\\s)                                                # Space
    (?<argument1>\\w+)                                               # Argument 1
    (?<flagsSeparator>\\s)                                           # Space
    (?<flags>(-{1,2}\\w+(\\=\\w+)?\\s){0,}(-{1,2}\\w+(\\=\\w+)?){1}) # Flags
    `,
    `gimx`
  );
}
