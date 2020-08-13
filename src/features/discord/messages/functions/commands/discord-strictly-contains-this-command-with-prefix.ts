import _ from "lodash";
import { IDiscordStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-strictly-contains-this-command-with-prefix-data";

export function discordStrictlyContainsThisCommandWithPrefix(
  data: Readonly<IDiscordStrictlyContainsThisCommandWithPrefixData>
): boolean {
  // @todo could be better to use a RegExp instead of pure white space
  return (
    _.includes(
      _.toLower(data.message),
      _.toLower(`${data.prefix}${data.command} `)
    ) ||
    _.endsWith(
      _.toLower(data.message),
      _.toLower(`${data.prefix}${data.command}`)
    )
  );
}
