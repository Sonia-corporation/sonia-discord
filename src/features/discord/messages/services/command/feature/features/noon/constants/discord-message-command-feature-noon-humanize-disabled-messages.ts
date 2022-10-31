import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-noon-humanize-disabled-messages.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES: Messages<DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum> =
  new Messages<DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum>({
    defaultMessage: DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU,
    messages: DiscordMessageCommandFeatureNoonHumanizeDisabledMessagesEnum,
  });
