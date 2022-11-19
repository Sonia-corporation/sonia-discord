import { discordContainsThisCommandWithPrefix } from './discord-contains-this-command-with-prefix';
import { IDiscordContainsThisCommandWithOneOfThesePrefixesData } from '../../../interfaces/commands/checks/discord-contains-this-command-with-one-of-these-prefixes-data';
import _ from 'lodash';

/**
 * @param root0
 * @param root0.prefixes
 * @param root0.commands
 * @param root0.message
 */
export function discordContainsThisCommandWithOneOfThesePrefixes({
  prefixes,
  commands,
  message,
}: IDiscordContainsThisCommandWithOneOfThesePrefixesData): boolean {
  let containsThisCommand = false;

  _.forEach(prefixes, (prefix: string): false | void => {
    if (
      discordContainsThisCommandWithPrefix({
        commands,
        message,
        prefix,
      })
    ) {
      containsThisCommand = true;

      return false;
    }
  });

  return containsThisCommand;
}
