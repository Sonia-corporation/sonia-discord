import { TimezoneEnum } from "../../../../../../../../time/enums/timezone.enum";
import { DiscordCommandFlag } from "../../../../../../classes/commands/discord-command-flag";
import { DiscordCommandFlags } from "../../../../../../classes/commands/discord-command-flags";
import { DiscordCommandFlagTypeEnum } from "../../../../../../enums/commands/discord-command-flag-type.enum";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../enums/discord-message-command-feature-noon-flag.enum";

export const DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum> = [
  new DiscordCommandFlag({
    description: `Enable the noon message on this channel. The message will be sent on the ${TimezoneEnum.PARIS} timezone.`,
    name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
    shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
    type: DiscordCommandFlagTypeEnum.BOOLEAN,
  }),
];
