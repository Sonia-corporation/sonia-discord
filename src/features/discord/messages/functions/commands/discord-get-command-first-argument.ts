import _ from "lodash";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandFirstArgumentData } from "../../interfaces/commands/discord-get-command-first-argument-data";
import { discordGetCommandWithPrefix } from "./discord-get-command-with-prefix";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";

export function discordGetCommandFirstArgument(
  data: Readonly<IDiscordGetCommandFirstArgumentData>
): string | null {
  const formattedMessage: string = discordGetFormattedMessage(data.message);
  const splittedMessage: string[] = _.split(formattedMessage, ` `);

  if (_.isString(data.prefixes)) {
    if (_.isString(data.commands)) {
      const prefix: string = data.prefixes;
      const command: DiscordMessageCommandEnum = data.commands;

      let commands: string[] = _.dropWhile(
        splittedMessage,
        (messagePart: Readonly<string>): boolean => {
          return !_.isEqual(
            messagePart,
            discordGetCommandWithPrefix({
              command,
              prefix,
            })
          );
        }
      );
      commands = _.drop(commands);

      return _.isString(commands[0]) ? commands[0] : null;
    }
  }

  return null;
}
