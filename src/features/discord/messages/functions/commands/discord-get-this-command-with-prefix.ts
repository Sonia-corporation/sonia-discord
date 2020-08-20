import _ from "lodash";
import { IDiscordGetThisCommandWithPrefixData } from "../../interfaces/commands/discord-get-this-command-with-prefix-data";
import { discordGetCommandRegexp } from "./discord-get-command-regexp";
import xregexp, { ExecArray } from "xregexp";

export function discordGetThisCommandWithPrefix({
  message,
  command,
  prefix,
}: Readonly<IDiscordGetThisCommandWithPrefixData>): string | null {
  const execArray: ExecArray | null = xregexp.exec(
    message,
    discordGetCommandRegexp({
      command,
      prefix,
    })
  );

  if (!_.isNil(execArray)) {
    return `${execArray.prefix}${execArray.command}`;
  }

  return null;
}
