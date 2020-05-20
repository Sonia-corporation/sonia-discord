import _ from "lodash";
import { IGetDiscordDevPrefix } from "../../interfaces/dev-prefix/get-discord-dev-prefix";

/**
 * @param {Readonly<IGetDiscordDevPrefix>} config The configuration object
 * [getDiscordDevPrefix#hasEmphasis]{@link IGetDiscordDevPrefix#hasEmphasis} will be set to true when not a boolean
 *
 * @return {string} A string representing the current developer profile
 */
export function getDiscordDevPrefix(
  config: Readonly<IGetDiscordDevPrefix>
): string {
  const hasEmphasis = _.isBoolean(config.hasEmphasis)
    ? config.hasEmphasis
    : true;
  let discordDevPrefix = `[dev]`;

  if (_.isString(config.nickname) && !_.isEmpty(config.nickname)) {
    discordDevPrefix = `[dev - ${config.nickname}]`;
  }

  if (_.isEqual(hasEmphasis, true)) {
    return `**${discordDevPrefix}**`;
  }

  return discordDevPrefix;
}
