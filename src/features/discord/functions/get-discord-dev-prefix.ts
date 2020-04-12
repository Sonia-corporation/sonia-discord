import _ from "lodash";

export function getDiscordDevPrefix(
  nickname: Readonly<string | null>,
  emphasis = true
): string {
  let discordDevPrefix = `[dev]`;

  if (_.isString(nickname) && !_.isEmpty(nickname)) {
    discordDevPrefix = `[dev - ${nickname}]`;
  }

  if (_.isEqual(emphasis, true)) {
    return `**${discordDevPrefix}**`;
  }

  return discordDevPrefix;
}
