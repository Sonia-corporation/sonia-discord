import { DISCORD_MESSAGE_COMMAND_LUNCH_TITLE_MESSAGES } from './discord-message-command-lunch-title-messages';
import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandLunchTitleEnum } from '../../../../enums/commands/lunch/discord-message-command-lunch-title.enum';

describe(`DISCORD_MESSAGE_COMMAND_LUNCH_TITLE_MESSAGES`, (): void => {
  it(`should be a Discord message command lunch descriptions`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_LUNCH_TITLE_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandLunchTitleEnum>({
        defaultMessage: DiscordMessageCommandLunchTitleEnum.LUNCH_TIME,
        messages: DiscordMessageCommandLunchTitleEnum,
      })
    );
  });
});
