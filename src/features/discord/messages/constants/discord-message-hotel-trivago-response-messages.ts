import { Messages } from '../classes/messages';
import { DiscordMessageHotelTrivagoResponseMessagesEnum } from '../enums/discord-message-hotel-trivago-response-messages.enum';
import { IDiscordMessageHotelTrivagoResponseMessage } from '../interfaces/discord-message-hotel-trivago-response-message';

export const DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES: Messages<
  DiscordMessageHotelTrivagoResponseMessagesEnum,
  IDiscordMessageHotelTrivagoResponseMessage
> = new Messages<DiscordMessageHotelTrivagoResponseMessagesEnum, IDiscordMessageHotelTrivagoResponseMessage>({
  defaultMessage: DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO,
  messages: DiscordMessageHotelTrivagoResponseMessagesEnum,
});
