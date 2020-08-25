import { IDiscordStrictlyContainsThisCommandWithPrefixData } from "../../../interfaces/commands/discord-strictly-contains-this-command-with-prefix-data";
import { discordGetCommandRegexp } from "../regexp/discord-get-command-regexp";
import xregexp from "xregexp";

export function discordStrictlyContainsThisCommandWithPrefix({
  message,
  command,
  prefix,
}: Readonly<IDiscordStrictlyContainsThisCommandWithPrefixData>): boolean {
  return xregexp.test(
    message,
    discordGetCommandRegexp({
      command,
      prefix,
    })
  );
}
