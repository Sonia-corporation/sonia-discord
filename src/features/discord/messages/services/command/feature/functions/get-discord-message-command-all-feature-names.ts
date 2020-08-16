import { DiscordMessageCommandFeatureNameEnum } from "../enums/discord-message-command-feature-name.enum";
import { IDiscordMessageCommandAllFeatureNames } from "../types/discord-message-command-all-feature-names";

export function getDiscordMessageCommandAllFeatureNames(): IDiscordMessageCommandAllFeatureNames {
  return [DiscordMessageCommandFeatureNameEnum.NOON];
}
