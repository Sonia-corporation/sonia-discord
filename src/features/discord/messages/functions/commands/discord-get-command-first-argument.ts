import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandFirstArgumentData } from "../../interfaces/commands/discord-get-command-first-argument-data";
import { discordGetCompleteCommandRegexp } from "./discord-get-complete-command-regexp";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import xregexp from "xregexp";

export function discordGetCommandFirstArgument(
  data: Readonly<IDiscordGetCommandFirstArgumentData>
): string | null | undefined {
  const formattedMessage: string = discordGetFormattedMessage(data.message);

  if (_.isString(data.prefixes)) {
    if (_.isString(data.commands)) {
      const command: DiscordMessageCommandEnum = data.commands;
      const prefix: string = data.prefixes;
      const argument1: string | undefined = xregexp.exec(
        formattedMessage,
        discordGetCompleteCommandRegexp({
          command,
          prefix,
        })
      )?.argument1;

      return _.isNil(argument1) ? null : argument1;
    }
  }

  return null;
}
