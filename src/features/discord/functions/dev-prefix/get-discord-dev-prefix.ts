import _ from "lodash";
import { IGetDiscordDevPrefix } from "../../interfaces/dev-prefix/get-discord-dev-prefix";

/**
 * @param {Readonly<IGetDiscordDevPrefix>} config The configuration object
 * [getDiscordDevPrefix#hasEmphasis]{@link IGetDiscordDevPrefix#hasEmphasis} will be set to true when not a boolean
 * [getDiscordDevPrefix#asMention]{@link IGetDiscordDevPrefix#asMention} will be set to false when not a boolean
 *
 * @return {string} A string representing the current developer profile
 */
export function getDiscordDevPrefix(
  config: Readonly<IGetDiscordDevPrefix>
): string {
  const hasEmphasis: boolean = _.isBoolean(config.hasEmphasis)
    ? config.hasEmphasis
    : true;
  const asMention: boolean = _.isBoolean(config.asMention)
    ? config.asMention
    : false;
  let discordDevPrefix = `[dev]`;

  if (
    _.isEqual(asMention, true) &&
    _.isString(config.discordId) &&
    !_.isEmpty(config.discordId)
  ) {
    discordDevPrefix = `[dev - <@!${config.discordId}>]`;
  } else {
    if (_.isString(config.nickname) && !_.isEmpty(config.nickname)) {
      discordDevPrefix = `[dev - ${config.nickname}]`;
    }
  }

  if (_.isEqual(hasEmphasis, true)) {
    return `**${discordDevPrefix}**`;
  }

  return discordDevPrefix;
}
