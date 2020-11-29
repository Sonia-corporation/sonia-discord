import { DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES } from './discord-message-hotel-trivago-response-messages';
import { Messages } from '../classes/messages';
import { DiscordMessageHotelTrivagoResponseMessagesEnum } from '../enums/discord-message-hotel-trivago-response-messages.enum';
import { IDiscordMessageHotelTrivagoResponseMessage } from '../interfaces/discord-message-hotel-trivago-response-message';

describe(`DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES`, (): void => {
  it(`should be a Discord message hotel trivago response`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_HOTEL_TRIVAGO_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageHotelTrivagoResponseMessagesEnum, IDiscordMessageHotelTrivagoResponseMessage>({
        defaultMessage: DiscordMessageHotelTrivagoResponseMessagesEnum.TRIVAGO,
        messages: DiscordMessageHotelTrivagoResponseMessagesEnum,
      })
    );
  });
});
