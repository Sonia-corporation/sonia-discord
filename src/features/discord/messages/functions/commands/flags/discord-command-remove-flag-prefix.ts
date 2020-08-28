import _ from "lodash";

export function discordCommandRemoveFlagPrefix(
  messageFlag: Readonly<string>
): string {
  return _.trimStart(messageFlag, `--`);
}
