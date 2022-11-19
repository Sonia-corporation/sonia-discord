import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordExtractFromCommandData } from '../../../interfaces/commands/checks/discord-extract-from-command-data';
import { IDiscordExtractFromCommandWithMultipleCommandsData } from '../../../interfaces/commands/checks/discord-extract-from-command-with-multiple-commands-data';
import { IDiscordExtractFromCommandWithMultiplePrefixesAndCommandsData } from '../../../interfaces/commands/checks/discord-extract-from-command-with-multiple-prefixes-and-commands-data';
import { IDiscordExtractFromCommandWithMultiplePrefixesData } from '../../../interfaces/commands/checks/discord-extract-from-command-with-multiple-prefixes-data';
import { discordGetFormattedMessage } from '../formatters/discord-get-formatted-message';
import _ from 'lodash';

/**
 * @param root0
 * @param root0.commands
 * @param root0.finder
 * @param root0.message
 * @param root0.prefix
 */
function extractFromCommandWithMultipleCommands({
  commands,
  finder,
  message,
  prefix,
}: IDiscordExtractFromCommandWithMultipleCommandsData): string | null {
  let firstArgument: string | null = null;

  _.forEach(commands, (command: DiscordMessageCommandEnum): false | void => {
    firstArgument = finder({
      command,
      message,
      prefix,
    });

    if (!_.isNil(firstArgument)) {
      return false;
    }
  });

  return firstArgument;
}

/**
 * @param root0
 * @param root0.command
 * @param root0.finder
 * @param root0.message
 * @param root0.prefixes
 */
function extractFromCommandWithMultiplePrefixes({
  command,
  finder,
  message,
  prefixes,
}: IDiscordExtractFromCommandWithMultiplePrefixesData): string | null {
  let firstArgument: string | null = null;

  _.forEach(prefixes, (prefix: string): false | void => {
    firstArgument = finder({
      command,
      message,
      prefix,
    });

    if (!_.isNil(firstArgument)) {
      return false;
    }
  });

  return firstArgument;
}

/**
 * @param root0
 * @param root0.commands
 * @param root0.finder
 * @param root0.message
 * @param root0.prefixes
 */
function extractFromCommandWithMultiplePrefixesAndCommands({
  commands,
  finder,
  message,
  prefixes,
}: IDiscordExtractFromCommandWithMultiplePrefixesAndCommandsData): string | null {
  let firstArgument: string | null = null;

  _.forEach(prefixes, (prefix: string): false | void => {
    _.forEach(commands, (command: DiscordMessageCommandEnum): false | void => {
      if (_.isNil(firstArgument)) {
        firstArgument = finder({
          command,
          message,
          prefix,
        });

        if (!_.isNil(firstArgument)) {
          return false;
        }
      }
    });
  });

  return firstArgument;
}

/**
 * @param value
 */
function isPrefix(value: string | string[]): value is string {
  return _.isString(value);
}

/**
 * @param value
 */
function isCommand(value: DiscordMessageCommandEnum | DiscordMessageCommandEnum[]): value is DiscordMessageCommandEnum {
  return _.isString(value);
}

/**
 * @description
 * No need to test it
 * This is an internal function
 * @param {IDiscordExtractFromCommandData} data The data to analyze the message
 * @returns {string | null} The value searched or null
 */
export function discordExtractFromCommand({
  commands,
  finder,
  message,
  prefixes,
}: IDiscordExtractFromCommandData): string | null {
  const formattedMessage: string = discordGetFormattedMessage(message);

  if (isPrefix(prefixes)) {
    if (isCommand(commands)) {
      return finder({
        command: commands,
        message: formattedMessage,
        prefix: prefixes,
      });
    }

    return extractFromCommandWithMultipleCommands({
      commands,
      finder,
      message: formattedMessage,
      prefix: prefixes,
    });
  }

  if (isCommand(commands)) {
    return extractFromCommandWithMultiplePrefixes({
      command: commands,
      finder,
      message: formattedMessage,
      prefixes,
    });
  }

  return extractFromCommandWithMultiplePrefixesAndCommands({
    commands,
    finder,
    message: formattedMessage,
    prefixes,
  });
}
