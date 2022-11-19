import { getDiscordDevPrefix } from './get-discord-dev-prefix';
import { IAddDiscordDevPrefix } from '../../interfaces/dev-prefix/add-discord-dev-prefix';

/**
 * @description
 * Add a dev prefix to the given message
 * Useful to distinguish Sonia prod from Sonia dev (locally)
 * @param {IAddDiscordDevPrefix} config The configuration object
 * [addDiscordDevPrefix#hasEmphasis]{@link IAddDiscordDevPrefix#hasEmphasis} will be set to true when not a boolean
 * [addDiscordDevPrefix#asMention]{@link IAddDiscordDevPrefix#asMention} will be set to false when not a boolean
 * @returns {string} The given message with a prefix representing the current developer profile
 */
export function addDiscordDevPrefix({
  hasEmphasis = true,
  asMention = false,
  discordId,
  nickname,
  message,
}: IAddDiscordDevPrefix): string {
  const discordDevPrefix: string = getDiscordDevPrefix({
    asMention,
    discordId,
    hasEmphasis,
    nickname,
  });

  return `${discordDevPrefix} ${message}`;
}
