import { IDiscordGetCommandWithPrefix } from '../../../interfaces/commands/getters/discord-get-command-with-prefix';
import _ from 'lodash';

/**
 * @param root0
 * @param root0.prefix
 * @param root0.command
 */
export function discordGetCommandWithPrefix({ prefix, command }: IDiscordGetCommandWithPrefix): string {
  return _.toLower(`${prefix}${command}`);
}
