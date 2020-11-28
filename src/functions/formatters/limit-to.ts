import { ellipsis } from './ellipsis';
import { DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT } from '../../features/discord/constants/discord-embed-field-data-value-limit';

/**
 * @description
 * Add an ellipsis to given value is the limit is reached
 *
 * @param {Readonly<string>} value The text to add an ellipsis to
 * @param {Readonly<number>} limit The limit of characters before applying the limit on the value
 *
 * @returns {string} The value formatted with a potential ellipsis
 */
export function limitTo(
  value: Readonly<string>,
  limit: Readonly<number> = DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT
): string {
  return ellipsis(value, limit, ``);
}
