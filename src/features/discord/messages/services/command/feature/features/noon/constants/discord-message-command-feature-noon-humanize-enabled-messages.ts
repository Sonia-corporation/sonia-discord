import { Messages } from '../../../../../../classes/messages';
import { DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum } from '../enums/discord-message-command-feature-noon-humanize-enabled-messages.enum';

export const DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES: Messages<DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum> =
  new Messages<DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum>({
    defaultMessage: DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum.I_LOVE_YOU,
    messages: DiscordMessageCommandFeatureNoonHumanizeEnabledMessagesEnum,
  });
