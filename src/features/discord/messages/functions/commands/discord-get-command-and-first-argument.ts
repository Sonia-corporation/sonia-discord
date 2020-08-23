import _ from "lodash";
import { IDiscordExtractFromCommandCallbackData } from "../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordGetCommandAndFirstArgumentData } from "../../interfaces/commands/discord-get-command-and-first-argument-data";
import { discordExtractFromCommand } from "./discord-extract-from-command";
import { discordGetCommandWithFirstArgumentRegexp } from "./discord-get-command-with-first-argument-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import xregexp, { ExecArray } from "xregexp";

function getCommandAndFirstArgument({
  command,
  message,
  prefix,
}: Readonly<IDiscordExtractFromCommandCallbackData>): string | null {
  const execArray: ExecArray | null = xregexp.exec(
    message,
    discordGetCommandWithFirstArgumentRegexp({
      command,
      prefix,
    })
  );

  if (!_.isNil(execArray)) {
    return `${execArray.prefix}${execArray.command} ${execArray.argument1}`;
  }

  return null;
}

export function discordGetCommandAndFirstArgument({
  commands,
  message,
  prefixes,
}: Readonly<IDiscordGetCommandAndFirstArgumentData>): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getCommandAndFirstArgument,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
