import { ellipsis } from './ellipsis';
import { DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT } from '../../features/discord/constants/discord-embed-field-data-value-limit';

export function limitTo(
  value: Readonly<string>,
  limit: Readonly<number> = DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT
): string {
  return ellipsis(value, limit, ``);
}
