import { discordContainsThisCommandWithOneOfThesePrefixes } from './discord-contains-this-command-with-one-of-these-prefixes';
import { discordContainsThisCommandWithPrefix } from './discord-contains-this-command-with-prefix';
import { IDiscordHasThisCommandData } from '../../../interfaces/commands/checks/discord-has-this-command-data';
import _ from 'lodash';

export function discordHasThisCommand({ prefixes, commands, message }: IDiscordHasThisCommandData): boolean {
  if (_.isString(prefixes)) {
    return discordContainsThisCommandWithPrefix({
      commands,
      message,
      prefix: prefixes,
    });
  } else if (_.isArray(prefixes)) {
    return discordContainsThisCommandWithOneOfThesePrefixes({
      commands,
      message,
      prefixes,
    });
  }

  return false;
}
