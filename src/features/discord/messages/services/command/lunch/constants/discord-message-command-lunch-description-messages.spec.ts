import { DISCORD_MESSAGE_COMMAND_LUNCH_DESCRIPTION_MESSAGES } from './discord-message-command-lunch-description-messages';
import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandLunchDescriptionEnum } from '../../../../enums/commands/lunch/discord-message-command-lunch-description.enum';

describe(`DISCORD_MESSAGE_COMMAND_LUNCH_DESCRIPTION_MESSAGES`, (): void => {
  it(`should be a Discord message command lunch descriptions`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_LUNCH_DESCRIPTION_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandLunchDescriptionEnum>({
        defaultMessage: DiscordMessageCommandLunchDescriptionEnum.COOL,
        messages: DiscordMessageCommandLunchDescriptionEnum,
      })
    );
  });
});
