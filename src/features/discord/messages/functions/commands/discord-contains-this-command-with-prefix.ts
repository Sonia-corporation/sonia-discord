import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-contains-this-command-with-prefix-data";
import { discordStrictlyContainsThisCommandWithPrefix } from "./discord-strictly-contains-this-command-with-prefix";

export function discordContainsThisCommandWithPrefix(
  data: Readonly<IDiscordContainsThisCommandWithPrefixData>
): boolean {
  let containsThisCommandWithPrefix = false;

  if (_.isString(data.commands)) {
    containsThisCommandWithPrefix = discordStrictlyContainsThisCommandWithPrefix(
      {
        command: data.commands,
        message: data.message,
        prefix: data.prefix,
      }
    );
  } else if (_.isArray(data.commands)) {
    _.forEach(data.commands, (command: Readonly<DiscordMessageCommandEnum>):
      | false
      | void => {
      if (
        discordStrictlyContainsThisCommandWithPrefix({
          command,
          message: data.message,
          prefix: data.prefix,
        })
      ) {
        containsThisCommandWithPrefix = true;

        return false;
      }
    });
  }

  return containsThisCommandWithPrefix;
}
