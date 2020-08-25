import _ from "lodash";
import xregexp, { ExecArray } from "xregexp";
import { IDiscordExtractFromCommandCallbackData } from "../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordGetCommandFlagsData } from "../../interfaces/commands/discord-get-command-flags-data";
import { discordExtractFromCommand } from "./discord-extract-from-command";
import { discordGetCommandWithFirstArgumentAndFlagsRegexp } from "./discord-get-command-with-first-argument-and-flags-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";

function getFlags({
  command,
  message,
  prefix,
}: Readonly<IDiscordExtractFromCommandCallbackData>): string | null {
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

  console.log(execArray);

  return execArray.groups.flags;
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
