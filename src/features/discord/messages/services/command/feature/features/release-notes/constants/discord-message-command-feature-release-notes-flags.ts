import { DiscordCommandBooleanFlag } from '../../../../../../classes/commands/flags/discord-command-boolean-flag';
import { DiscordCommandFlags } from '../../../../../../classes/commands/flags/discord-command-flags';
import { DiscordCommandValuelessFlag } from '../../../../../../classes/commands/flags/discord-command-valueless-flag';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES } from '../../../constants/discord-message-command-feature-name-release-notes';
import { DiscordMessageCommandFeatureReleaseNotesDisabled } from '../classes/discord-message-command-feature-release-notes-disabled';
import { DiscordMessageCommandFeatureReleaseNotesEnabled } from '../classes/discord-message-command-feature-release-notes-enabled';
import { DiscordMessageCommandFeatureReleaseNotesHelp } from '../classes/discord-message-command-feature-release-notes-help';
import { DiscordMessageCommandFeatureReleaseNotesHumanize } from '../classes/discord-message-command-feature-release-notes-humanize';
import { DiscordMessageCommandFeatureReleaseNotesStatus } from '../classes/discord-message-command-feature-release-notes-status';
import { DiscordMessageCommandFeatureReleaseNotesFlagEnum } from '../enums/discord-message-command-feature-release-notes-flag.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_FLAGS: DiscordCommandFlags<DiscordMessageCommandFeatureReleaseNotesFlagEnum> =
  new DiscordCommandFlags<DiscordMessageCommandFeatureReleaseNotesFlagEnum>({
    command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES,
    flags: [
      new DiscordCommandBooleanFlag<DiscordMessageCommandFeatureReleaseNotesFlagEnum>({
        action: new DiscordMessageCommandFeatureReleaseNotesEnabled(),
        description: `Enable the release notes message on this channel. The message will be sent each time a new release is published.`,
        name: DiscordMessageCommandFeatureReleaseNotesFlagEnum.ENABLED,
        opposites: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.DISABLED],
        shortcuts: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.E],
      }),
      new DiscordCommandBooleanFlag<DiscordMessageCommandFeatureReleaseNotesFlagEnum>({
        action: new DiscordMessageCommandFeatureReleaseNotesDisabled(),
        description: `Disable the release notes message on this channel.`,
        name: DiscordMessageCommandFeatureReleaseNotesFlagEnum.DISABLED,
        opposites: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.ENABLED],
        shortcuts: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.D],
      }),
      new DiscordCommandValuelessFlag<DiscordMessageCommandFeatureReleaseNotesFlagEnum>({
        action: new DiscordMessageCommandFeatureReleaseNotesHelp(),
        description: `Get some help with the release notes command. Display all the flags with an example.`,
        name: DiscordMessageCommandFeatureReleaseNotesFlagEnum.HELP,
        shortcuts: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.H],
      }),
      new DiscordCommandValuelessFlag<DiscordMessageCommandFeatureReleaseNotesFlagEnum>({
        action: new DiscordMessageCommandFeatureReleaseNotesHumanize(),
        description: `Display the current release notes configuration for this channel.`,
        name: DiscordMessageCommandFeatureReleaseNotesFlagEnum.HUMANIZE,
        shortcuts: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.HU],
      }),
      new DiscordCommandValuelessFlag<DiscordMessageCommandFeatureReleaseNotesFlagEnum>({
        action: new DiscordMessageCommandFeatureReleaseNotesStatus(),
        description: `Display either or not the feature is enabled.`,
        name: DiscordMessageCommandFeatureReleaseNotesFlagEnum.STATUS,
        shortcuts: [DiscordMessageCommandFeatureReleaseNotesFlagEnum.S],
      }),
    ],
  });
