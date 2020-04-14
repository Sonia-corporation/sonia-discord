import _ from "lodash";

export function getDiscordDevPrefix(
  nickname: Readonly<string | null>,
  hasEmphasis: Readonly<boolean> = true
): string {
  let discordDevPrefix = `[dev]`;

  if (_.isString(nickname) && !_.isEmpty(nickname)) {
    discordDevPrefix = `[dev - ${nickname}]`;
  }

  if (_.isEqual(hasEmphasis, true)) {
    return `**${discordDevPrefix}**`;
  }

  return discordDevPrefix;
}
