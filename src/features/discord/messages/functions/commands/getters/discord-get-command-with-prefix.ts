import { IDiscordGetCommandWithPrefix } from '../../../interfaces/commands/getters/discord-get-command-with-prefix';
import _ from 'lodash';

export function discordGetCommandWithPrefix({ prefix, command }: Readonly<IDiscordGetCommandWithPrefix>): string {
  return _.toLower(`${prefix}${command}`);
}
