import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-contains-this-command-with-prefix-data";
import { discordStrictlyContainsThisCommandWithPrefix } from "./discord-strictly-contains-this-command-with-prefix";

export function discordContainsThisCommandWithPrefix(
  data: Readonly<IDiscordContainsThisCommandWithPrefixData>
): boolean {
  let containsThisCommandWithPrefix = false;

  if (_.isString(data.commands)) {
    const command: DiscordMessageCommandEnum = data.commands;

    containsThisCommandWithPrefix = discordStrictlyContainsThisCommandWithPrefix(
      {
        command,
        message: data.message,
        prefix: data.prefix,
      }
    );
  } else if (_.isArray(data.commands)) {
    const commands: DiscordMessageCommandEnum[] = data.commands;

    _.forEach(commands, (command: Readonly<DiscordMessageCommandEnum>):
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
