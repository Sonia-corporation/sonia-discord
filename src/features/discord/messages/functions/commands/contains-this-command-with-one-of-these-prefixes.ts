import _ from "lodash";
import { IContainsThisCommandWithOneOfThesePrefixesData } from "../../interfaces/commands/contains-this-command-with-one-of-these-prefixes-data";
import { containsThisCommandWithPrefix } from "./contains-this-command-with-prefix";

export function containsThisCommandWithOneOfThesePrefixes(
  containsThisCommandWithOneOfThesePrefixesData: Readonly<
    IContainsThisCommandWithOneOfThesePrefixesData
  >
): boolean {
  let containsThisCommand = false;

  _.forEach(
    containsThisCommandWithOneOfThesePrefixesData.prefixes,
    (prefix: Readonly<string>): false | void => {
      if (
        containsThisCommandWithPrefix({
          commands: containsThisCommandWithOneOfThesePrefixesData.commands,
          message: containsThisCommandWithOneOfThesePrefixesData.message,
          prefix,
        })
      ) {
        containsThisCommand = true;

        return false;
      }
    }
  );

  return containsThisCommand;
}
