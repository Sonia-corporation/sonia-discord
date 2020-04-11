import _ from "lodash";

export function addDiscordDevPrefix(
  message: Readonly<string>,
  nickname: Readonly<string | null>
): string {
  if (_.isString(nickname) && !_.isEmpty(nickname)) {
    return `**[dev - ${nickname}]** ${message}`;
  }

  return `**[dev]** ${message}`;
}
