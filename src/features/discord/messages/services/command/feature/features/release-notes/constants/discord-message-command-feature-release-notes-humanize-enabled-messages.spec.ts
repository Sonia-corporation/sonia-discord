import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES } from './discord-message-command-feature-release-notes-humanize-enabled-messages';
import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-enabled-messages.enum';

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES`, (): void => {
  it(`should be a messages of Discord message command feature release notes humanize enabled messages`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum>({
        defaultMessage: DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_LOVE_YOU,
        messages: DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum,
      })
    );
  });
});
