import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandLunchTitleEnum } from '../../../../enums/commands/lunch/discord-message-command-lunch-title.enum';

export const DISCORD_MESSAGE_COMMAND_LUNCH_TITLE_MESSAGES: Messages<DiscordMessageCommandLunchTitleEnum> = new Messages<DiscordMessageCommandLunchTitleEnum>(
  {
    defaultMessage: DiscordMessageCommandLunchTitleEnum.LUNCH_TIME,
    messages: DiscordMessageCommandLunchTitleEnum,
  }
);
