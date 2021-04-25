import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES } from './discord-message-command-feature-name-release-notes';
import { DiscordCommandFirstArgument } from '../../../../classes/commands/arguments/discord-command-first-argument';
import { DiscordMessageCommandFeatureNameEnum } from '../enums/discord-message-command-feature-name.enum';

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES`, (): void => {
  it(`should be the Discord release notes feature command message`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_NAME_RELEASE_NOTES).toStrictEqual(
      new DiscordCommandFirstArgument({
        description: `Configure the message sent when there is a new release note`,
        name: DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES,
        shortcuts: [DiscordMessageCommandFeatureNameEnum.R],
      })
    );
  });
});
