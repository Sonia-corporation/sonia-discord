import { IDiscordGetThisCommandWithPrefixData } from '../../../interfaces/commands/getters/discord-get-this-command-with-prefix-data';
import { discordGetCommandRegexp } from '../regexp/discord-get-command-regexp';
import _ from 'lodash';
import xregexp, { ExecArray } from 'xregexp';

export function discordGetThisCommandWithPrefix({
  message,
  command,
  prefix,
}: Readonly<IDiscordGetThisCommandWithPrefixData>): string | null {
  const execArray: ExecArray | null = xregexp.exec(
    message,
    discordGetCommandRegexp({
      command,
      prefix,
    })
  );

  if (_.isNil(execArray)) {
    return null;
  }

  const fullCommand: string | undefined = _.head(execArray);

  return _.isNil(fullCommand) ? null : fullCommand;
}
