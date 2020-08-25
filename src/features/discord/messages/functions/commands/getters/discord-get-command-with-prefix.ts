import _ from "lodash";
import { IDiscordGetCommandWithPrefix } from "../../../interfaces/commands/getters/discord-get-command-with-prefix";

export function discordGetCommandWithPrefix({
  prefix,
  command,
}: Readonly<IDiscordGetCommandWithPrefix>): string {
  return _.toLower(`${prefix}${command}`);
}
