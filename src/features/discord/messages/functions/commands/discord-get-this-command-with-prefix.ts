import _ from "lodash";
import { IDiscordGetThisCommandWithPrefixData } from "../../interfaces/commands/discord-get-this-command-with-prefix-data";
import { discordGetCommandRegexp } from "./discord-get-command-regexp";
import xregexp, { ExecArray } from "xregexp";

export function discordGetThisCommandWithPrefix(
  data: Readonly<IDiscordGetThisCommandWithPrefixData>
): string | null {
  const execArray: ExecArray | null = xregexp.exec(
    data.message,
    discordGetCommandRegexp({
      command: data.command,
      prefix: data.prefix,
    })
  );

  if (!_.isNil(execArray)) {
    return `${execArray.prefix}${execArray.command}`;
  }

  return null;
}
