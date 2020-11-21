import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandLunchDescriptionEnum } from '../../../../enums/commands/lunch/discord-message-command-lunch-description.enum';

export const DISCORD_MESSAGE_COMMAND_LUNCH_DESCRIPTION_MESSAGES: Messages<DiscordMessageCommandLunchDescriptionEnum> = new Messages<DiscordMessageCommandLunchDescriptionEnum>(
  {
    defaultMessage: DiscordMessageCommandLunchDescriptionEnum.COOL,
    messages: DiscordMessageCommandLunchDescriptionEnum,
  }
);
