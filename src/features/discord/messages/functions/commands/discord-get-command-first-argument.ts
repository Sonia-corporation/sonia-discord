import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandFirstArgumentData } from "../../interfaces/commands/discord-get-command-first-argument-data";
import { discordGetCompleteCommandRegexp } from "./discord-get-complete-command-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import xregexp from "xregexp";

function getFirstArgument(data: {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}): string | null {
  const argument1: string | undefined = xregexp.exec(
    data.message,
    discordGetCompleteCommandRegexp({
      command: data.command,
      prefix: data.prefix,
    })
  )?.argument1;

  return _.isNil(argument1) ? null : argument1;
}

function getFirstArgumentFromMultipleCommands(data: {
  commands: DiscordMessageCommandEnum[];
  message: string;
  prefix: string;
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.commands, (command: Readonly<DiscordMessageCommandEnum>):
    | false
    | void => {
    firstArgument = getFirstArgument({
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

function getFirstArgumentFromMultiplePrefixes(data: {
  command: DiscordMessageCommandEnum;
  message: string;
  prefixes: string[];
}): string | null {
  let firstArgument: string | null = null;

  _.forEach(data.prefixes, (prefix: Readonly<string>): false | void => {
    firstArgument = getFirstArgument({
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

function getFirstArgumentFromMultiplePrefixesAndCommands(data: {
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
        firstArgument = getFirstArgument({
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

export function discordGetCommandFirstArgument(
  data: Readonly<IDiscordGetCommandFirstArgumentData>
): string | null {
  const formattedMessage: string = discordGetFormattedMessage(data.message);

  if (_.isString(data.prefixes)) {
    if (_.isString(data.commands)) {
      const prefix: string = data.prefixes;
      const command: DiscordMessageCommandEnum = data.commands;

      return getFirstArgument({
        command,
        message: formattedMessage,
        prefix,
      });
    }

    const prefix: string = data.prefixes;

    return getFirstArgumentFromMultipleCommands({
      commands: data.commands,
      message: formattedMessage,
      prefix,
    });
  }

  if (_.isString(data.commands)) {
    const command: DiscordMessageCommandEnum = data.commands;

    return getFirstArgumentFromMultiplePrefixes({
      command,
      message: formattedMessage,
      prefixes: data.prefixes,
    });
  }

  return getFirstArgumentFromMultiplePrefixesAndCommands({
    commands: data.commands,
    message: formattedMessage,
    prefixes: data.prefixes,
  });
}
