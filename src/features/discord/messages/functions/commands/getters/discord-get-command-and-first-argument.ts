import { IDiscordExtractFromCommandCallbackData } from '../../../interfaces/commands/checks/discord-extract-from-command-callback-data';
import { IDiscordGetCommandAndFirstArgumentData } from '../../../interfaces/commands/getters/discord-get-command-and-first-argument-data';
import { discordExtractFromCommand } from '../checks/discord-extract-from-command';
import { discordGetFormattedMessage } from '../formatters/discord-get-formatted-message';
import { discordGetCommandWithFirstArgumentRegexp } from '../regexp/discord-get-command-with-first-argument-regexp';
import _ from 'lodash';
import xregexp, { ExecArray } from 'xregexp';

function getCommandAndFirstArgument({
  command,
  message,
  prefix,
}: IDiscordExtractFromCommandCallbackData): string | null {
  const execArray: ExecArray | null = xregexp.exec(
    message,
    discordGetCommandWithFirstArgumentRegexp({
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

export function discordGetCommandAndFirstArgument({
  commands,
  message,
  prefixes,
}: IDiscordGetCommandAndFirstArgumentData): string | null {
  return discordExtractFromCommand({
    commands,
    finder: getCommandAndFirstArgument,
    message: discordGetFormattedMessage(message),
    prefixes,
  });
}
