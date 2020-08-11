import _ from "lodash";
import { IHasThisCommandData } from "../../interfaces/commands/has-this-command-data";
import { containsThisCommandWithOneOfThesePrefixes } from "./contains-this-command-with-one-of-these-prefixes";
import { containsThisCommandWithPrefix } from "./contains-this-command-with-prefix";

export function hasThisCommand(
  hasThisCommandData: Readonly<IHasThisCommandData>
): boolean {
  if (_.isString(hasThisCommandData.prefixes)) {
    return containsThisCommandWithPrefix({
      commands: hasThisCommandData.commands,
      message: hasThisCommandData.message,
      prefix: hasThisCommandData.prefixes,
    });
  } else if (_.isArray(hasThisCommandData.prefixes)) {
    return containsThisCommandWithOneOfThesePrefixes({
      commands: hasThisCommandData.commands,
      message: hasThisCommandData.message,
      prefixes: hasThisCommandData.prefixes,
    });
  }

  return false;
}
