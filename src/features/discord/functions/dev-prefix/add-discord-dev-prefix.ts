import _ from "lodash";
import { IAddDiscordDevPrefix } from "../../interfaces/dev-prefix/add-discord-dev-prefix";
import { getDiscordDevPrefix } from "./get-discord-dev-prefix";

/**
 * @param {Readonly<IAddDiscordDevPrefix>} config The configuration object
 * [addDiscordDevPrefix#hasEmphasis]{@link IAddDiscordDevPrefix#hasEmphasis} will be set to true when not a boolean
 * [addDiscordDevPrefix#asMention]{@link IAddDiscordDevPrefix#asMention} will be set to false when not a boolean
 *
 * @return {string} The given message with a prefix representing the current developer profile
 */
export function addDiscordDevPrefix(
  config: Readonly<IAddDiscordDevPrefix>
): string {
  const hasEmphasis: boolean = _.isBoolean(config.hasEmphasis)
    ? config.hasEmphasis
    : true;
  const asMention: boolean = _.isBoolean(config.asMention)
    ? config.asMention
    : false;
  const discordDevPrefix: string = getDiscordDevPrefix({
    asMention,
    discordId: config.discordId,
    hasEmphasis,
    nickname: config.nickname,
  });

  return `${discordDevPrefix} ${config.message}`;
}
