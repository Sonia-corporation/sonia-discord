import { IDiscordExtractFromCommandCallbackData } from '../../../interfaces/commands/checks/discord-extract-from-command-callback-data';
import { IDiscordGetCommandFlagsData } from '../../../interfaces/commands/getters/discord-get-command-flags-data';
import { discordExtractFromCommand } from '../checks/discord-extract-from-command';
import { discordGetFormattedMessage } from '../formatters/discord-get-formatted-message';
import { discordGetCommandWithFirstArgumentAndFlagsRegexp } from '../regexp/discord-get-command-with-first-argument-and-flags-regexp';
import _ from 'lodash';
import xregexp, { ExecArray } from 'xregexp';

/**
 * @param root0
 * @param root0.command
 * @param root0.message
 * @param root0.prefix
 */
function getFlags({ command, message, prefix }: IDiscordExtractFromCommandCallbackData): string | null {
  const execArray: ExecArray | null = xregexp.exec(
    message,
    discordGetCommandWithFirstArgumentAndFlagsRegexp({
      command,
      prefix,
    })
  );

  if (_.isNil(execArray) || _.isNil(execArray.groups)) {
    return null;
  }

  return execArray.groups.flags;
}

/**
 * @param root0
 * @param root0.commands
 * @param root0.message
 * @param root0.prefixes
 */
export function discordGetCommandFlags({ commands, message, prefixes }: IDiscordGetCommandFlagsData): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getFlags,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
