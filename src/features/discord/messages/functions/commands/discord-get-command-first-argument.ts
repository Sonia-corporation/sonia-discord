import _ from "lodash";
import { IDiscordExtractFromCommandCallbackData } from "../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordGetCommandFirstArgumentData } from "../../interfaces/commands/discord-get-command-first-argument-data";
import { discordExtractFromCommand } from "./discord-extract-from-command";
import { discordGetCompleteCommandRegexp } from "./discord-get-complete-command-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import xregexp from "xregexp";

function getFirstArgument({
  command,
  message,
  prefix,
}: Readonly<IDiscordExtractFromCommandCallbackData>): string | null {
  const argument1: string | undefined = xregexp.exec(
    message,
    discordGetCompleteCommandRegexp({
      command,
      prefix,
    })
  )?.argument1;

  return _.isNil(argument1) ? null : argument1;
}

export function discordGetCommandFirstArgument({
  commands,
  message,
  prefixes,
}: Readonly<IDiscordGetCommandFirstArgumentData>): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getFirstArgument,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
