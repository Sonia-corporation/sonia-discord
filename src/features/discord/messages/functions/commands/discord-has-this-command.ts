import _ from "lodash";
import { IDiscordHasThisCommandData } from "../../interfaces/commands/discord-has-this-command-data";
import { discordContainsThisCommandWithOneOfThesePrefixes } from "./discord-contains-this-command-with-one-of-these-prefixes";
import { discordContainsThisCommandWithPrefix } from "./discord-contains-this-command-with-prefix";

export function discordHasThisCommand(
  data: Readonly<IDiscordHasThisCommandData>
): boolean {
  if (_.isString(data.prefixes)) {
    const prefix: string = data.prefixes;

    return discordContainsThisCommandWithPrefix({
      commands: data.commands,
      message: data.message,
      prefix,
    });
  } else if (_.isArray(data.prefixes)) {
    const prefixes: string[] = data.prefixes;

    return discordContainsThisCommandWithOneOfThesePrefixes({
      commands: data.commands,
      message: data.message,
      prefixes,
    });
  }

  return false;
}
