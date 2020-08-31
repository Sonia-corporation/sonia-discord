import _ from "lodash";
import { DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT } from "../../features/discord/constants/discord-embed-field-data-value-limit";

export function ellipsis(
  value: Readonly<string>,
  limit: Readonly<number> = DISCORD_EMBED_FIELD_DATA_VALUE_LIMIT,
  suffix: Readonly<string> = `...`
): string {
  return _.truncate(value, {
    length: limit,
    omission: suffix,
  });
}
