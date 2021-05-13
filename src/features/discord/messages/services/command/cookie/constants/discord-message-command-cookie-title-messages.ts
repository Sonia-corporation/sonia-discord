import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandCookieTitleEnum } from '../../../../enums/commands/cookie/discord-message-command-cookie-title.enum';

export const DISCORD_MESSAGE_COMMAND_COOKIE_TITLE_MESSAGES: Messages<DiscordMessageCommandCookieTitleEnum> =
  new Messages<DiscordMessageCommandCookieTitleEnum>({
    defaultMessage: DiscordMessageCommandCookieTitleEnum.COOKIES,
    messages: DiscordMessageCommandCookieTitleEnum,
  });
