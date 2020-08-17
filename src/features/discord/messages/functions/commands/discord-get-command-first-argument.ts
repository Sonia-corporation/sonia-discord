import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandFirstArgumentData } from "../../interfaces/commands/discord-get-command-first-argument-data";
import { discordExtractFromCommand } from "./discord-extract-from-command";
import { discordGetCompleteCommandRegexp } from "./discord-get-complete-command-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import xregexp from "xregexp";

function getFirstArgument(data: {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}): string | null {
  const argument1: string | undefined = xregexp.exec(
    data.message,
    discordGetCompleteCommandRegexp({
      command: data.command,
      prefix: data.prefix,
    })
  )?.argument1;

  return _.isNil(argument1) ? null : argument1;
}

export function discordGetCommandFirstArgument(
  data: Readonly<IDiscordGetCommandFirstArgumentData>
): string | null {
  return discordExtractFromCommand({
    callback: getFirstArgument,
    commands: data.commands,
    message: discordGetFormattedMessage(data.message),
    prefixes: data.prefixes,
  });
}
