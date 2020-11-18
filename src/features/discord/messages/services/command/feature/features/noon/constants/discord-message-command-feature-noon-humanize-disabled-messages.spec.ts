import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES } from './discord-message-command-feature-noon-humanize-disabled-messages';
import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-noon-humanize-disabled-messages.enum';

describe(`DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES`, (): void => {
  it(`should be a messages of Discord message command feature noon humanize disabled messages`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum>({
        defaultMessage: DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU,
        messages: DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum,
      })
    );
  });
});
