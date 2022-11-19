import { IDiscordStrictlyContainsThisCommandWithPrefixData } from '../../../interfaces/commands/checks/discord-strictly-contains-this-command-with-prefix-data';
import { discordGetCommandRegexp } from '../regexp/discord-get-command-regexp';
import xregexp from 'xregexp';

/**
 * @param root0
 * @param root0.message
 * @param root0.command
 * @param root0.prefix
 */
export function discordStrictlyContainsThisCommandWithPrefix({
  message,
  command,
  prefix,
}: IDiscordStrictlyContainsThisCommandWithPrefixData): boolean {
  return xregexp.test(
    message,
    discordGetCommandRegexp({
      command,
      prefix,
    })
  );
}
