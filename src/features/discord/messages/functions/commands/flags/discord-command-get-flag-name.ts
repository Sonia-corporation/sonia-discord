import { discordCommandRemoveFlagPrefix } from './discord-command-remove-flag-prefix';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import _ from 'lodash';

/**
 * @description
 * Extract the flag name from a message flag
 * @example
 * discordCommandGetFlagName('')          => null
 * discordCommandGetFlagName('-f')        => f
 * discordCommandGetFlagName('-f=')       => f
 * discordCommandGetFlagName('-f=dummy')  => f
 * discordCommandGetFlagName('--f')       => f
 * discordCommandGetFlagName('--f=')      => f
 * discordCommandGetFlagName('--f=dummy') => f
 * @param {IDiscordMessageFlag} messageFlag A flag as a message
 * @param {boolean} [toLowerCase=false] Return the flag name to lower case
 * @returns {string | null} A string when the flag name exists
 */
export function discordCommandGetFlagName(messageFlag: IDiscordMessageFlag, toLowerCase = false): string | null {
  const flagName: string | undefined = _.head(_.split(discordCommandRemoveFlagPrefix(messageFlag), `=`));

  return _.isNil(flagName) || _.isEmpty(flagName)
    ? null
    : _.isEqual(toLowerCase, true)
    ? _.toLower(flagName)
    : flagName;
}
