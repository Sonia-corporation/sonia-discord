import _ from "lodash";
import { IDiscordContainsThisCommandWithOneOfThesePrefixesData } from "../../interfaces/commands/discord-contains-this-command-with-one-of-these-prefixes-data";
import { discordContainsThisCommandWithPrefix } from "./discord-contains-this-command-with-prefix";

export function discordContainsThisCommandWithOneOfThesePrefixes(
  containsThisCommandWithOneOfThesePrefixesData: Readonly<
    IDiscordContainsThisCommandWithOneOfThesePrefixesData
  >
): boolean {
  let containsThisCommand = false;

  _.forEach(
    containsThisCommandWithOneOfThesePrefixesData.prefixes,
    (prefix: Readonly<string>): false | void => {
      if (
        discordContainsThisCommandWithPrefix({
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
