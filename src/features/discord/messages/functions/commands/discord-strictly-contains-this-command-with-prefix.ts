import _ from "lodash";
import { IDiscordStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-strictly-contains-this-command-with-prefix-data";
import { discordGetCommandWithPrefix } from "./discord-get-command-with-prefix";

export function discordStrictlyContainsThisCommandWithPrefix(
  data: Readonly<IDiscordStrictlyContainsThisCommandWithPrefixData>
): boolean {
  // @todo could be better to use a RegExp instead of pure white space
  return (
    _.includes(
      _.toLower(data.message),
      discordGetCommandWithPrefix({
        command: data.command,
        prefix: data.prefix,
      })
    ) ||
    _.endsWith(
      _.toLower(data.message),
      discordGetCommandWithPrefix({
        command: data.command,
        prefix: data.prefix,
      })
    )
  );
}
