import { Messages } from '../classes/messages';
import { DiscordMessagePingPongResponseMessagesEnum } from '../enums/discord-message-ping-pong-response-messages.enum';
import { IDiscordMessagePingPongResponseMessage } from '../interfaces/discord-message-ping-pong-response-message';

export const DISCORD_MESSAGE_PING_PONG_RESPONSE_MESSAGES: Messages<
  DiscordMessagePingPongResponseMessagesEnum,
  IDiscordMessagePingPongResponseMessage
> = new Messages<DiscordMessagePingPongResponseMessagesEnum, IDiscordMessagePingPongResponseMessage>({
  defaultMessage: DiscordMessagePingPongResponseMessagesEnum.PONG,
  messages: DiscordMessagePingPongResponseMessagesEnum,
});
