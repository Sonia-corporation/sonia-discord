import { DiscordMessageCommandFeatureNoonFlagEnum } from "../enums/discord-message-command-feature-noon-flag.enum";
import { IDiscordMessageCommandNoonAllFlags } from "../types/discord-message-command-noon-all-flags";

export function getDiscordMessageCommandNoonAllFlags(): IDiscordMessageCommandNoonAllFlags {
  return [DiscordMessageCommandFeatureNoonFlagEnum.ENABLED];
}
