import { DISCORD_MESSAGE_COMMAND_COOKIE_DESCRIPTION_MESSAGES } from './discord-message-command-cookie-description-messages';
import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandCookieDescriptionEnum } from '../../../../enums/commands/cookie/discord-message-command-cookie-description.enum';

describe(`DISCORD_MESSAGE_COMMAND_COOKIE_DESCRIPTION_MESSAGES`, (): void => {
  it(`should be the Discord message command cookie descriptions`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_COOKIE_DESCRIPTION_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandCookieDescriptionEnum>({
        defaultMessage: DiscordMessageCommandCookieDescriptionEnum.YES,
        messages: DiscordMessageCommandCookieDescriptionEnum,
      })
    );
  });
});
