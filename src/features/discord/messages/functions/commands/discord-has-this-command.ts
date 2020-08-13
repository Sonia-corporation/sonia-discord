import _ from "lodash";
import { IDiscordHasThisCommandData } from "../../interfaces/commands/discord-has-this-command-data";
import { discordContainsThisCommandWithOneOfThesePrefixes } from "./discord-contains-this-command-with-one-of-these-prefixes";
import { discordContainsThisCommandWithPrefix } from "./discord-contains-this-command-with-prefix";

export function discordHasThisCommand(
  hasThisCommandData: Readonly<IDiscordHasThisCommandData>
): boolean {
  if (_.isString(hasThisCommandData.prefixes)) {
    return discordContainsThisCommandWithPrefix({
      commands: hasThisCommandData.commands,
      message: hasThisCommandData.message,
      prefix: hasThisCommandData.prefixes,
    });
  } else if (_.isArray(hasThisCommandData.prefixes)) {
    return discordContainsThisCommandWithOneOfThesePrefixes({
      commands: hasThisCommandData.commands,
      message: hasThisCommandData.message,
      prefixes: hasThisCommandData.prefixes,
    });
  }

  return false;
}
