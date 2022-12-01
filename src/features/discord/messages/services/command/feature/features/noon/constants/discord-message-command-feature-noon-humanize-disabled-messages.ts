import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-noon-humanize-disabled-messages.enum';
import { IDiscordMessageCommandFeatureNoonHumanizeDisabledMessagesParams } from '../interfaces/discord-message-command-feature-noon-humanize-disabled-messages-params';

export const DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES: Messages<
  DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum,
  IDiscordMessageCommandFeatureNoonHumanizeDisabledMessagesParams
> = new Messages<
  DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum,
  IDiscordMessageCommandFeatureNoonHumanizeDisabledMessagesParams
>({
  defaultMessage: DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU,
  messages: DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum,
});
