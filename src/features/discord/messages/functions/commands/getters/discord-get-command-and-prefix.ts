import { IDiscordExtractFromCommandCallbackData } from "../../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordGetCommandAndPrefixData } from "../../../interfaces/commands/discord-get-command-and-prefix-data";
import { discordExtractFromCommand } from "../checks/discord-extract-from-command";
import { discordGetFormattedMessage } from "../formatters/discord-get-formatted-message";
import { discordGetThisCommandWithPrefix } from "./discord-get-this-command-with-prefix";

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
