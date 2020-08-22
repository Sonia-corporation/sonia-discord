import _ from "lodash";
import { IDiscordExtractFromCommandCallbackData } from "../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordGetCommandFlagsData } from "../../interfaces/commands/discord-get-command-flags-data";
import { discordExtractFromCommand } from "./discord-extract-from-command";
import { discordGetCommandWithFirstArgumentAndFlagsRegexp } from "./discord-get-command-with-first-argument-and-flags-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import xregexp from "xregexp";

function getFlags({
  command,
  message,
  prefix,
}: Readonly<IDiscordExtractFromCommandCallbackData>): string | null {
  const flags: string | undefined = xregexp.exec(
    message,
    discordGetCommandWithFirstArgumentAndFlagsRegexp({
      command,
      prefix,
    })
  )?.flags;

  return _.isNil(flags) ? null : flags;
}

export function discordGetCommandFlags({
  commands,
  message,
  prefixes,
}: Readonly<IDiscordGetCommandFlagsData>): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getFlags,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
