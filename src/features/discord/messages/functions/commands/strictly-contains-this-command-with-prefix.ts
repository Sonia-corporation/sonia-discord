import _ from "lodash";
import { IStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/strictly-contains-this-command-with-prefix-data";

export function strictlyContainsThisCommandWithPrefix(
  strictlyContainsThisCommandWithPrefixData: Readonly<
    IStrictlyContainsThisCommandWithPrefixData
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
