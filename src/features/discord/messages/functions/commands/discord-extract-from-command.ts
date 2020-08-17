import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordExtractFromCommandCallbackData } from "../../interfaces/commands/discord-extract-from-command-callback-data";
import { IDiscordExtractFromCommandData } from "../../interfaces/commands/discord-extract-from-command-data";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";

function getCommandAndPrefixFromMultipleCommands(data: {
  commands: DiscordMessageCommandEnum[];
  finder: (
    data: Readonly<IDiscordExtractFromCommandCallbackData>
  ) => string | null;
  message: string;
  prefix: string;
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.commands, (command: Readonly<DiscordMessageCommandEnum>):
    | false
    | void => {
    firstArgument = data.finder({
      command,
      message: data.message,
      prefix: data.prefix,
    });

    if (!_.isNil(firstArgument)) {
      return false;
    }
  });

  return firstArgument;
}

function getCommandAndPrefixFromMultiplePrefixes(data: {
  command: DiscordMessageCommandEnum;
  finder: (
    data: Readonly<IDiscordExtractFromCommandCallbackData>
  ) => string | null;
  message: string;
  prefixes: string[];
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.prefixes, (prefix: Readonly<string>): false | void => {
    firstArgument = data.finder({
      command: data.command,
      message: data.message,
      prefix,
    });

    if (!_.isNil(firstArgument)) {
      return false;
    }
  });

  return firstArgument;
}

function getCommandAndPrefixFromMultiplePrefixesAndCommands(data: {
  commands: DiscordMessageCommandEnum[];
  finder: (
    data: Readonly<IDiscordExtractFromCommandCallbackData>
  ) => string | null;
  message: string;
  prefixes: string[];
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.prefixes, (prefix: Readonly<string>): false | void => {
    _.forEach(data.commands, (command: Readonly<DiscordMessageCommandEnum>):
      | false
      | void => {
      if (_.isNil(firstArgument)) {
        firstArgument = data.finder({
          command,
          message: data.message,
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

    return getCommandAndPrefixFromMultipleCommands({
      commands,
      finder,
      message: formattedMessage,
      prefix,
    });
  }

  if (isCommand(commands)) {
    const command: DiscordMessageCommandEnum = commands;

    return getCommandAndPrefixFromMultiplePrefixes({
      command,
      finder,
      message: formattedMessage,
      prefixes,
    });
  }

  return getCommandAndPrefixFromMultiplePrefixesAndCommands({
    commands,
    finder,
    message: formattedMessage,
    prefixes,
  });
}
