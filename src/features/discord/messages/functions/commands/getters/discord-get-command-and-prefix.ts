import { discordGetThisCommandWithPrefix } from './discord-get-this-command-with-prefix';
import { IDiscordExtractFromCommandCallbackData } from '../../../interfaces/commands/checks/discord-extract-from-command-callback-data';
import { IDiscordGetCommandAndPrefixData } from '../../../interfaces/commands/getters/discord-get-command-and-prefix-data';
import { discordExtractFromCommand } from '../checks/discord-extract-from-command';
import { discordGetFormattedMessage } from '../formatters/discord-get-formatted-message';

function getCommandAndPrefix({ command, message, prefix }: IDiscordExtractFromCommandCallbackData): string | null {
  return discordGetThisCommandWithPrefix({
    command,
    message,
    prefix,
  });
}

export function discordGetCommandAndPrefix({
  commands,
  message,
  prefixes,
}: IDiscordGetCommandAndPrefixData): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getCommandAndPrefix,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
