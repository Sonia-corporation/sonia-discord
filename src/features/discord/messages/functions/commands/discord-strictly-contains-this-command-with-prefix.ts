import _ from "lodash";
import { IDiscordStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-strictly-contains-this-command-with-prefix-data";

export function discordStrictlyContainsThisCommandWithPrefix(
  strictlyContainsThisCommandWithPrefixData: Readonly<
    IDiscordStrictlyContainsThisCommandWithPrefixData
  >
): boolean {
  // @todo could be better to use a RegExp instead of pure white space
  return (
    _.includes(
      _.toLower(strictlyContainsThisCommandWithPrefixData.message),
      _.toLower(
        `${strictlyContainsThisCommandWithPrefixData.prefix}${strictlyContainsThisCommandWithPrefixData.command} `
      )
    ) ||
    _.endsWith(
      _.toLower(strictlyContainsThisCommandWithPrefixData.message),
      _.toLower(
        `${strictlyContainsThisCommandWithPrefixData.prefix}${strictlyContainsThisCommandWithPrefixData.command}`
      )
    )
  );
}
