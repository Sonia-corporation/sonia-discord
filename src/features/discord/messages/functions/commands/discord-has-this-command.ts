import _ from "lodash";
import { IDiscordHasThisCommandData } from "../../interfaces/commands/discord-has-this-command-data";
import { discordContainsThisCommandWithOneOfThesePrefixes } from "./discord-contains-this-command-with-one-of-these-prefixes";
import { discordContainsThisCommandWithPrefix } from "./discord-contains-this-command-with-prefix";

export function discordHasThisCommand({
  prefixes,
  commands,
  message,
}: Readonly<IDiscordHasThisCommandData>): boolean {
  if (_.isString(prefixes)) {
    return discordContainsThisCommandWithPrefix({
      commands,
      message,
      prefix: prefixes,
    });
  } else if (_.isArray(prefixes)) {
    return discordContainsThisCommandWithOneOfThesePrefixes({
      commands,
      message,
      prefixes,
    });
  }

  return false;
}
