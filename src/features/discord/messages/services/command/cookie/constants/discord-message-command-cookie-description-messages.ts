import { Messages } from "../../../../classes/messages";
import { DiscordMessageCommandCookieDescriptionEnum } from "../../../../enums/commands/cookie/discord-message-command-cookie-description.enum";

export const DISCORD_MESSAGE_COMMAND_COOKIE_DESCRIPTION_MESSAGES: Messages<DiscordMessageCommandCookieDescriptionEnum> = new Messages<
  DiscordMessageCommandCookieDescriptionEnum
>({
  defaultMessage: DiscordMessageCommandCookieDescriptionEnum.YES,
  messages: DiscordMessageCommandCookieDescriptionEnum,
});
