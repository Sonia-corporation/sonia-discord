import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES } from './discord-message-command-feature-noon-humanize-enabled-messages';
import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum } from '../enums/discord-message-command-feature-noon-humanize-enabled-messages.enum';

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES`, (): void => {
  it(`should be a messages of Discord message command feature noon humanize enabled messages`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum>({
        defaultMessage: DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.I_LOVE_YOU,
        messages: DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum,
      })
    );
  });
});
