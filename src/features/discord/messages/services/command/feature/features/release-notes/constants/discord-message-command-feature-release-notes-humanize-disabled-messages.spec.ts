import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES } from './discord-message-command-feature-release-notes-humanize-disabled-messages';
import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-disabled-messages.enum';

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES`, (): void => {
  it(`should be a messages of Discord message command feature release notes humanize disabled messages`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum>({
        defaultMessage: DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU,
        messages: DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum,
      })
    );
  });
});
