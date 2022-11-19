import { IDiscordGetCommandWithFirstArgumentRegexpData } from '../../../interfaces/commands/getters/discord-get-command-with-first-argument-regexp-data';
import xregexp from 'xregexp';

/**
 * @param {IDiscordGetCommandWithFirstArgumentRegexpData} data The data used as a command
 * @returns {RegExp} A RegExp matching a prefix with a command and one argument
 */
export function discordGetCommandWithFirstArgumentRegexp({
  prefix,
  command,
}: IDiscordGetCommandWithFirstArgumentRegexpData): RegExp {
  return xregexp(
    `
    (?<prefix>\\${prefix})                      # Command prefix
    (?<command>${command})                      # Command name
    (?<separator>\\s)                           # Space
    (?<argument1>([a-z][a-z0-9]*)(-[a-z0-9]+)*) # Argument 1
    `,
    `gimx`
  );
}
