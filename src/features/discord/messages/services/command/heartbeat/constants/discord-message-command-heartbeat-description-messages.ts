import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandHeartbeatDescriptionEnum } from '../../../../enums/commands/heartbeat/discord-message-command-heartbeat-description.enum';

export const DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES: Messages<DiscordMessageCommandHeartbeatDescriptionEnum> =
  new Messages<DiscordMessageCommandHeartbeatDescriptionEnum>({
    defaultMessage: DiscordMessageCommandHeartbeatDescriptionEnum.IS_IT_GOOD,
    messages: DiscordMessageCommandHeartbeatDescriptionEnum,
  });
