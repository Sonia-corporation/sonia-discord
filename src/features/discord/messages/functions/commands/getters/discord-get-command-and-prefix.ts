import { discordGetThisCommandWithPrefix } from './discord-get-this-command-with-prefix';
import { IDiscordExtractFromCommandCallbackData } from '../../../interfaces/commands/checks/discord-extract-from-command-callback-data';
import { IDiscordGetCommandAndPrefixData } from '../../../interfaces/commands/getters/discord-get-command-and-prefix-data';
import { discordExtractFromCommand } from '../checks/discord-extract-from-command';
import { discordGetFormattedMessage } from '../formatters/discord-get-formatted-message';

/**
 * @param root0
 * @param root0.command
 * @param root0.message
 * @param root0.prefix
 */
function getCommandAndPrefix({
  command,
  message,
  prefix,
}: Readonly<IDiscordExtractFromCommandCallbackData>): string | null {
  return discordGetThisCommandWithPrefix({
    command,
    message,
    prefix,
  });
}

/**
 * @param root0
 * @param root0.commands
 * @param root0.message
 * @param root0.prefixes
 */
export function discordGetCommandAndPrefix({
  commands,
  message,
  prefixes,
}: Readonly<IDiscordGetCommandAndPrefixData>): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getCommandAndPrefix,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
