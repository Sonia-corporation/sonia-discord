import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-disabled-messages.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES: Messages<DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum> =
  new Messages<DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum>({
    defaultMessage: DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU,
    messages: DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum,
  });
