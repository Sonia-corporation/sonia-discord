import _ from "lodash";
import { IDiscordStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/discord-strictly-contains-this-command-with-prefix-data";
import { discordGetCommandWithPrefix } from "./discord-get-command-with-prefix";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";

export function discordStrictlyContainsThisCommandWithPrefix(
  data: Readonly<IDiscordStrictlyContainsThisCommandWithPrefixData>
): boolean {
  // @todo could be better to use a RegExp instead of pure white space
  return (
    _.includes(
      discordGetFormattedMessage(data.message),
      `${discordGetCommandWithPrefix({
        command: data.command,
        prefix: data.prefix,
      })} `
    ) ||
    _.endsWith(
      discordGetFormattedMessage(data.message),
      discordGetCommandWithPrefix({
        command: data.command,
        prefix: data.prefix,
      })
    )
  );
}
