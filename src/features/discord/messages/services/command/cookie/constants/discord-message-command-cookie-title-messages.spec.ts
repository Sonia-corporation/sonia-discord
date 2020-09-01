import { Messages } from "../../../../classes/messages";
import { DiscordMessageCommandCookieTitleEnum } from "../../../../enums/commands/cookie/discord-message-command-cookie-title.enum";
import { DISCORD_MESSAGE_COMMAND_COOKIE_TITLE_MESSAGES } from "./discord-message-command-cookie-title-messages";

describe(`DISCORD_MESSAGE_COMMAND_COOKIE_TITLE_MESSAGES`, (): void => {
  it(`should be the Discord message command cookie titles`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_COOKIE_TITLE_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandCookieTitleEnum>({
        defaultMessage: DiscordMessageCommandCookieTitleEnum.COOKIES,
        messages: DiscordMessageCommandCookieTitleEnum,
      })
    );
  });
});
