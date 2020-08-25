import _ from "lodash";
import { IDiscordContainsThisCommandWithOneOfThesePrefixesData } from "../../../interfaces/commands/checks/discord-contains-this-command-with-one-of-these-prefixes-data";
import { discordContainsThisCommandWithPrefix } from "./discord-contains-this-command-with-prefix";

export function discordContainsThisCommandWithOneOfThesePrefixes({
  prefixes,
  commands,
  message,
}: Readonly<IDiscordContainsThisCommandWithOneOfThesePrefixesData>): boolean {
  let containsThisCommand = false;

  _.forEach(prefixes, (prefix: Readonly<string>): false | void => {
    if (
      discordContainsThisCommandWithPrefix({
        commands,
        message,
        prefix,
      })
    ) {
      containsThisCommand = true;

      return false;
    }
  });

  return containsThisCommand;
}
