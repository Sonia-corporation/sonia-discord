import _ from "lodash";
import { IDiscordGetCommandWithPrefix } from "../../interfaces/commands/discord-get-command-with-prefix";

export function discordGetCommandWithPrefix(
  data: Readonly<IDiscordGetCommandWithPrefix>
): string {
  return _.toLower(`${data.prefix}${data.command}`);
}
