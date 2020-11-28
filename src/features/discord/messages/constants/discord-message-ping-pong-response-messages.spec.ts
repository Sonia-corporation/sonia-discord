import { DISCORD_MESSAGE_PING_PONG_RESPONSE_MESSAGES } from './discord-message-ping-pong-response-messages';
import { Messages } from '../classes/messages';
import { DiscordMessagePingPongResponseMessagesEnum } from '../enums/discord-message-ping-pong-response-messages.enum';

describe(`DISCORD_MESSAGE_PING_PONG_RESPONSE_MESSAGES`, (): void => {
  it(`should be a Discord message ping pong response`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_PING_PONG_RESPONSE_MESSAGES).toStrictEqual(
      new Messages<DiscordMessagePingPongResponseMessagesEnum>({
        defaultMessage: DiscordMessagePingPongResponseMessagesEnum.PONG,
        messages: DiscordMessagePingPongResponseMessagesEnum,
      })
    );
  });
});
