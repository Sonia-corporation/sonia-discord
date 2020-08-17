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

/**
 * @description
 * No need to test it
 * This is an internal function
 *
 * @param {Readonly<IDiscordExtractFromCommandData>} data The data to analyze the message
 *
 * @return {string | null} The value searched or null
 */
export function discordExtractFromCommand(
  data: Readonly<IDiscordExtractFromCommandData>
): string | null {
  const formattedMessage: string = discordGetFormattedMessage(data.message);

  if (_.isString(data.prefixes)) {
    if (_.isString(data.commands)) {
      const prefix: string = data.prefixes;
      const command: DiscordMessageCommandEnum = data.commands;

      return data.finder({
        command,
        message: formattedMessage,
        prefix,
      });
    }

    const prefix: string = data.prefixes;

    return getCommandAndPrefixFromMultipleCommands({
      commands: data.commands,
      finder: data.finder,
      message: formattedMessage,
      prefix,
    });
  }

  if (_.isString(data.commands)) {
    const command: DiscordMessageCommandEnum = data.commands;

    return getCommandAndPrefixFromMultiplePrefixes({
      command,
      finder: data.finder,
      message: formattedMessage,
      prefixes: data.prefixes,
    });
  }

  return getCommandAndPrefixFromMultiplePrefixesAndCommands({
    commands: data.commands,
    finder: data.finder,
    message: formattedMessage,
    prefixes: data.prefixes,
  });
}
