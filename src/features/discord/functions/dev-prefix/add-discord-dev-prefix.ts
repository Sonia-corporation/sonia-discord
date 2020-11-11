import { getDiscordDevPrefix } from './get-discord-dev-prefix';
import { IAddDiscordDevPrefix } from '../../interfaces/dev-prefix/add-discord-dev-prefix';

/**
 * @param {Readonly<IAddDiscordDevPrefix>} config The configuration object
 * [addDiscordDevPrefix#hasEmphasis]{@link IAddDiscordDevPrefix#hasEmphasis} will be set to true when not a boolean
 * [addDiscordDevPrefix#asMention]{@link IAddDiscordDevPrefix#asMention} will be set to false when not a boolean
 *
 * @return {string} The given message with a prefix representing the current developer profile
 */
export function addDiscordDevPrefix({
  hasEmphasis = true,
  asMention = false,
  discordId,
  nickname,
  message,
}: Readonly<IAddDiscordDevPrefix>): string {
  const discordDevPrefix: string = getDiscordDevPrefix({
    asMention,
    discordId,
    hasEmphasis,
    nickname,
  });

  return `${discordDevPrefix} ${message}`;
}
