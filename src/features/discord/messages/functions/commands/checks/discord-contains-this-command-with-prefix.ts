import { discordStrictlyContainsThisCommandWithPrefix } from './discord-strictly-contains-this-command-with-prefix';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordContainsThisCommandWithPrefixData } from '../../../interfaces/commands/checks/discord-contains-this-command-with-prefix-data';
import _ from 'lodash';

export function discordContainsThisCommandWithPrefix({
  commands,
  message,
  prefix,
}: IDiscordContainsThisCommandWithPrefixData): boolean {
  let containsThisCommandWithPrefix = false;

  if (_.isString(commands)) {
    const command: DiscordMessageCommandEnum = commands;

    containsThisCommandWithPrefix = discordStrictlyContainsThisCommandWithPrefix({
      command,
      message,
      prefix,
    });
  } else if (_.isArray(commands)) {
    _.forEach(commands, (command: DiscordMessageCommandEnum): false | void => {
      if (
        discordStrictlyContainsThisCommandWithPrefix({
          command,
          message,
          prefix,
        })
      ) {
        containsThisCommandWithPrefix = true;

        return false;
      }
    });
  }

  return containsThisCommandWithPrefix;
}
