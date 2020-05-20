import _ from "lodash";
import { IAddDiscordDevPrefix } from "../../interfaces/dev-prefix/add-discord-dev-prefix";
import { getDiscordDevPrefix } from "./get-discord-dev-prefix";

/**
 * @param {Readonly<IAddDiscordDevPrefix>} config The configuration object
 * [addDiscordDevPrefix#hasEmphasis]{@link IAddDiscordDevPrefix#hasEmphasis} will be set to true when not a boolean
 *
 * @return {string} The given message with a prefix representing the current developer profile
 */
export function addDiscordDevPrefix(
  config: Readonly<IAddDiscordDevPrefix>
): string {
  const hasEmphasis = _.isBoolean(config.hasEmphasis)
    ? config.hasEmphasis
    : true;
  const discordDevPrefix: string = getDiscordDevPrefix({
    discordId: config.discordId,
    hasEmphasis,
    nickname: config.nickname,
  });

  if (_.isString(config.nickname) && !_.isEmpty(config.nickname)) {
    return `${discordDevPrefix} ${config.message}`;
  }

  return `${discordDevPrefix} ${config.message}`;
}
