import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandHeartbeatTitleEnum } from '../../../../enums/commands/heartbeat/discord-message-command-heartbeat-title.enum';

export const DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES: Messages<DiscordMessageCommandHeartbeatTitleEnum> =
  new Messages<DiscordMessageCommandHeartbeatTitleEnum>({
    defaultMessage: DiscordMessageCommandHeartbeatTitleEnum.THIS_IS_MY_PING,
    messages: DiscordMessageCommandHeartbeatTitleEnum,
  });
