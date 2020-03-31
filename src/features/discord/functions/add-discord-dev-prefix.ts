import _ from "lodash";

export function addDiscordDevPrefix(
  message: Readonly<string>,
  nickname: Readonly<string>
): string {
  if (_.isNull(nickname) || _.isEmpty(nickname)) {
    return `**[dev]** ${message}`;
  }
  return `**[dev - ${nickname}]** ${message}`;
}
