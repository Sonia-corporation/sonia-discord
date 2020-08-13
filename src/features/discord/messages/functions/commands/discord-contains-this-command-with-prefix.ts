import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-contains-this-command-with-prefix-data";
import { discordStrictlyContainsThisCommandWithPrefix } from "./discord-strictly-contains-this-command-with-prefix";

export function discordContainsThisCommandWithPrefix(
  containsThisCommandWithPrefixData: Readonly<
    IDiscordContainsThisCommandWithPrefixData
  >
): boolean {
  let containsThisCommandWithPrefix = false;

  if (_.isString(containsThisCommandWithPrefixData.commands)) {
    containsThisCommandWithPrefix = discordStrictlyContainsThisCommandWithPrefix(
      {
        command: containsThisCommandWithPrefixData.commands,
        message: containsThisCommandWithPrefixData.message,
        prefix: containsThisCommandWithPrefixData.prefix,
      }
    );
  } else if (_.isArray(containsThisCommandWithPrefixData.commands)) {
    _.forEach(
      containsThisCommandWithPrefixData.commands,
      (command: Readonly<DiscordMessageCommandEnum>): false | void => {
        if (
          discordStrictlyContainsThisCommandWithPrefix({
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
