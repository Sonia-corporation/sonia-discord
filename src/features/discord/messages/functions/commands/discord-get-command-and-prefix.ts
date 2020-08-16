import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandAndPrefixData } from "../../interfaces/commands/discord-get-command-and-prefix-data";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import { discordGetThisCommandWithPrefix } from "./discord-get-this-command-with-prefix";

function getCommandAndPrefix(data: {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}): string | null {
  return discordGetThisCommandWithPrefix({
    command: data.command,
    message: data.message,
    prefix: data.prefix,
  });
}

function getCommandAndPrefixFromMultipleCommands(data: {
  commands: DiscordMessageCommandEnum[];
  message: string;
  prefix: string;
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.commands, (command: Readonly<DiscordMessageCommandEnum>):
    | false
    | void => {
    firstArgument = getCommandAndPrefix({
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
  message: string;
  prefixes: string[];
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.prefixes, (prefix: Readonly<string>): false | void => {
    firstArgument = getCommandAndPrefix({
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
  message: string;
  prefixes: string[];
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.prefixes, (prefix: Readonly<string>): false | void => {
    _.forEach(data.commands, (command: Readonly<DiscordMessageCommandEnum>):
      | false
      | void => {
      if (_.isNil(firstArgument)) {
        firstArgument = getCommandAndPrefix({
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

export function discordGetCommandAndPrefix(
  data: Readonly<IDiscordGetCommandAndPrefixData>
): string | null {
  const formattedMessage: string = discordGetFormattedMessage(data.message);

  if (_.isString(data.prefixes)) {
    if (_.isString(data.commands)) {
      const prefix: string = data.prefixes;
      const command: DiscordMessageCommandEnum = data.commands;

      return getCommandAndPrefix({
        command,
        message: formattedMessage,
        prefix,
      });
    } else if (_.isArray(data.commands)) {
      const prefix: string = data.prefixes;

      return getCommandAndPrefixFromMultipleCommands({
        commands: data.commands,
        message: formattedMessage,
        prefix,
      });
    }
  } else if (_.isArray(data.prefixes)) {
    if (_.isString(data.commands)) {
      const command: DiscordMessageCommandEnum = data.commands;

      return getCommandAndPrefixFromMultiplePrefixes({
        command,
        message: formattedMessage,
        prefixes: data.prefixes,
      });
    } else if (_.isArray(data.commands)) {
      return getCommandAndPrefixFromMultiplePrefixesAndCommands({
        commands: data.commands,
        message: formattedMessage,
        prefixes: data.prefixes,
      });
    }
  }

  return null;
}
