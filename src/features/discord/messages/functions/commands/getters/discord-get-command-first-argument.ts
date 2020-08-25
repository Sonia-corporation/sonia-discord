import _ from "lodash";
import { IDiscordExtractFromCommandCallbackData } from "../../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordGetCommandFirstArgumentData } from "../../../interfaces/commands/discord-get-command-first-argument-data";
import { discordExtractFromCommand } from "../checks/discord-extract-from-command";
import { discordGetCommandWithFirstArgumentRegexp } from "../regexp/discord-get-command-with-first-argument-regexp";
import { discordGetFormattedMessage } from "../formatters/discord-get-formatted-message";
import xregexp, { ExecArray } from "xregexp";

function getFirstArgument({
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

  if (_.isNil(execArray) || _.isNil(execArray.groups)) {
    return null;
  }

  return execArray.groups.argument1;
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
