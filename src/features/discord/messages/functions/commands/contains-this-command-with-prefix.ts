import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IContainsThisCommandWithPrefixData } from "../../interfaces/commands/contains-this-command-with-prefix-data";
import { strictlyContainsThisCommandWithPrefix } from "./strictly-contains-this-command-with-prefix";

export function containsThisCommandWithPrefix(
  containsThisCommandWithPrefixData: Readonly<
    IContainsThisCommandWithPrefixData
  >
): boolean {
  let containsThisCommandWithPrefix = false;

  if (_.isString(containsThisCommandWithPrefixData.commands)) {
    containsThisCommandWithPrefix = strictlyContainsThisCommandWithPrefix({
      command: containsThisCommandWithPrefixData.commands,
      message: containsThisCommandWithPrefixData.message,
      prefix: containsThisCommandWithPrefixData.prefix,
    });
  } else if (_.isArray(containsThisCommandWithPrefixData.commands)) {
    _.forEach(
      containsThisCommandWithPrefixData.commands,
      (command: Readonly<DiscordMessageCommandEnum>): false | void => {
        if (
          strictlyContainsThisCommandWithPrefix({
            command,
            message: containsThisCommandWithPrefixData.message,
            prefix: containsThisCommandWithPrefixData.prefix,
          })
        ) {
          containsThisCommandWithPrefix = true;

          return false;
        }
      }
    );
  }

  return containsThisCommandWithPrefix;
}
