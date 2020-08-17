import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordExtractFromCommandData } from "../../interfaces/commands/discord-extract-from-command-data";
import { IDiscordExtractFromCommandWithMultipleCommandsData } from "../../interfaces/commands/discord-extract-from-command-with-multiple-commands-data";
import { IDiscordExtractFromCommandWithMultiplePrefixesAndCommandsData } from "../../interfaces/commands/discord-extract-from-command-with-multiple-prefixes-and-commands-data";
import { IDiscordExtractFromCommandWithMultiplePrefixesData } from "../../interfaces/commands/discord-extract-from-command-with-multiple-prefixes-data";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";

function extractFromCommandWithMultipleCommands({
  commands,
  finder,
  message,
  prefix,
}: Readonly<IDiscordExtractFromCommandWithMultipleCommandsData>):
  | string
  | null {
  let firstArgument: string | null = null;

  _.forEach(commands, (command: Readonly<DiscordMessageCommandEnum>):
    | false
    | void => {
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

function extractFromCommandWithMultiplePrefixes({
  command,
  finder,
  message,
  prefixes,
}: Readonly<IDiscordExtractFromCommandWithMultiplePrefixesData>):
  | string
  | null {
  let firstArgument: string | null = null;

  _.forEach(prefixes, (prefix: Readonly<string>): false | void => {
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

function extractFromCommandWithMultiplePrefixesAndCommands({
  commands,
  finder,
  message,
  prefixes,
}: Readonly<IDiscordExtractFromCommandWithMultiplePrefixesAndCommandsData>):
  | string
  | null {
  let firstArgument: string | null = null;

  _.forEach(prefixes, (prefix: Readonly<string>): false | void => {
    _.forEach(commands, (command: Readonly<DiscordMessageCommandEnum>):
      | false
      | void => {
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

function isPrefix(value: Readonly<string | string[]>): value is string {
  return _.isString(value);
}

function isCommand(
  value: Readonly<DiscordMessageCommandEnum | DiscordMessageCommandEnum[]>
): value is DiscordMessageCommandEnum {
  return _.isString(value);
}

/**
 * @description
 * No need to test it
 * This is an internal function
 *
 * @param {Readonly<IDiscordExtractFromCommandData>} data The data to analyze the message
 *
 * @return {string | null} The value searched or null
 */
export function discordExtractFromCommand({
  commands,
  finder,
  message,
  prefixes,
}: Readonly<IDiscordExtractFromCommandData>): string | null {
  const formattedMessage: string = discordGetFormattedMessage(message);

  if (isPrefix(prefixes)) {
    if (isCommand(commands)) {
      const prefix: string = prefixes;
      const command: DiscordMessageCommandEnum = commands;

      return finder({
        command,
        message: formattedMessage,
        prefix,
      });
    }

    const prefix: string = prefixes;

    return extractFromCommandWithMultipleCommands({
      commands,
      finder,
      message: formattedMessage,
      prefix,
    });
  }

  if (isCommand(commands)) {
    const command: DiscordMessageCommandEnum = commands;

    return extractFromCommandWithMultiplePrefixes({
      command,
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
