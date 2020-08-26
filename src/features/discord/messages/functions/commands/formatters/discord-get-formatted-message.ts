import _ from "lodash";

export function discordGetFormattedMessage(message: Readonly<string>): string {
  return _.toLower(message);
}
