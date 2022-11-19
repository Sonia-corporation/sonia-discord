import { IDiscordGetCommandRegexpData } from '../../../interfaces/commands/getters/discord-get-command-regexp-data';
import xregexp from 'xregexp';

/**
 * @param {IDiscordGetCommandRegexpData} data The data used as a command
 * @returns {RegExp} A RegExp matching a prefix with a command
 */
export function discordGetCommandRegexp({ prefix, command }: IDiscordGetCommandRegexpData): RegExp {
  return xregexp(
    `
    (?<prefix>\\${prefix}) # Command prefix
    (?<command>${command}) # Command name
    (?=$|\\s)              # End of the message or space after the command name (required for shortcuts like help and h)
    `,
    `gimx`
  );
}
