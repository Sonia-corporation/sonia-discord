import { IDiscordStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-strictly-contains-this-command-with-prefix-data";
import { discordGetCommandRegexp } from "./discord-get-command-regexp";
import xregexp from "xregexp";

export function discordStrictlyContainsThisCommandWithPrefix(
  data: Readonly<IDiscordStrictlyContainsThisCommandWithPrefixData>
): boolean {
  return xregexp.test(
    data.message,
    discordGetCommandRegexp({
      command: data.command,
      prefix: data.prefix,
    })
  );
}
