import { TimezoneEnum } from "../../../../../../../../time/enums/timezone.enum";
import { DiscordCommandBooleanFlag } from "../../../../../../classes/commands/flags/discord-command-boolean-flag";
import { DiscordCommandFlags } from "../../../../../../classes/commands/flags/discord-command-flags";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../enums/discord-message-command-feature-noon-flag.enum";

export const DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum> = new DiscordCommandFlags(
  [
    new DiscordCommandBooleanFlag({
      description: `Enable the noon message on this channel. The message will be sent on the ${TimezoneEnum.PARIS} timezone.`,
      name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
      shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
    }),
  ]
);
