import { TimezoneEnum } from '../../../../../../../../time/enums/timezone.enum';
import { DiscordCommandBooleanFlag } from '../../../../../../classes/commands/flags/discord-command-boolean-flag';
import { DiscordCommandFlags } from '../../../../../../classes/commands/flags/discord-command-flags';
import { DiscordCommandValuelessFlag } from '../../../../../../classes/commands/flags/discord-command-valueless-flag';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from '../../../constants/discord-message-command-feature-name-noon';
import { DiscordMessageCommandFeatureNoonDisabled } from '../classes/discord-message-command-feature-noon-disabled';
import { DiscordMessageCommandFeatureNoonEnabled } from '../classes/discord-message-command-feature-noon-enabled';
import { DiscordMessageCommandFeatureNoonHelp } from '../classes/discord-message-command-feature-noon-help';
import { DiscordMessageCommandFeatureNoonHumanize } from '../classes/discord-message-command-feature-noon-humanize';
import { DiscordMessageCommandFeatureNoonStatus } from '../classes/discord-message-command-feature-noon-status';
import { DiscordMessageCommandFeatureNoonFlagEnum } from '../enums/discord-message-command-feature-noon-flag.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum> =
  new DiscordCommandFlags({
    command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
    flags: [
      new DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>({
        action: new DiscordMessageCommandFeatureNoonEnabled(),
        description: `Enable the noon message on this channel. The message will be sent on the ${TimezoneEnum.PARIS} timezone.`,
        name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
        opposites: [DiscordMessageCommandFeatureNoonFlagEnum.DISABLED],
        shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
      }),
      new DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>({
        action: new DiscordMessageCommandFeatureNoonDisabled(),
        description: `Disable the noon message on this channel.`,
        name: DiscordMessageCommandFeatureNoonFlagEnum.DISABLED,
        opposites: [DiscordMessageCommandFeatureNoonFlagEnum.ENABLED],
        shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.D],
      }),
      new DiscordCommandValuelessFlag<DiscordMessageCommandFeatureNoonFlagEnum>({
        action: new DiscordMessageCommandFeatureNoonHelp(),
        description: `Get some help with the noon command. Display all the flags with an example.`,
        name: DiscordMessageCommandFeatureNoonFlagEnum.HELP,
        shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.H],
      }),
      new DiscordCommandValuelessFlag<DiscordMessageCommandFeatureNoonFlagEnum>({
        action: new DiscordMessageCommandFeatureNoonHumanize(),
        description: `Display the current noon configuration for this channel.`,
        name: DiscordMessageCommandFeatureNoonFlagEnum.HUMANIZE,
        shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.HU],
      }),
      new DiscordCommandValuelessFlag<DiscordMessageCommandFeatureNoonFlagEnum>({
        action: new DiscordMessageCommandFeatureNoonStatus(),
        description: `Display either or not the feature is enabled.`,
        name: DiscordMessageCommandFeatureNoonFlagEnum.STATUS,
        shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.S],
      }),
    ],
  });
