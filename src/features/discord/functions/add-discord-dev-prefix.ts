import _ from "lodash";
import { getDiscordDevPrefix } from "./get-discord-dev-prefix";

export function addDiscordDevPrefix(
  message: Readonly<string>,
  nickname: Readonly<string | null>,
  hasEmphasis: Readonly<boolean> = true
): string {
  const discordDevPrefix: string = getDiscordDevPrefix(nickname, hasEmphasis);

  if (_.isString(nickname) && !_.isEmpty(nickname)) {
    return `${discordDevPrefix} ${message}`;
  }

  return `${discordDevPrefix} ${message}`;
}
