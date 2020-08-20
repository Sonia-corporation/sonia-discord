import _ from "lodash";
import { IDiscordGetCommandWithPrefix } from "../../interfaces/commands/discord-get-command-with-prefix";

export function discordGetCommandWithPrefix({
  prefix,
  command,
}: Readonly<IDiscordGetCommandWithPrefix>): string {
  return _.toLower(`${prefix}${command}`);
}
