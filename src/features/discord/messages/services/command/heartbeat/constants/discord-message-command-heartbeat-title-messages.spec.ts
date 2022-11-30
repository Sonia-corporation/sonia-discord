import { DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES } from './discord-message-command-heartbeat-title-messages';
import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandHeartbeatTitleEnum } from '../../../../enums/commands/heartbeat/discord-message-command-heartbeat-title.enum';

describe(`DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES`, (): void => {
  it(`should be the Discord message command heartbeat titles`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_HEARTBEAT_TITLE_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandHeartbeatTitleEnum>({
        defaultMessage: DiscordMessageCommandHeartbeatTitleEnum.THIS_IS_MY_PING,
        messages: DiscordMessageCommandHeartbeatTitleEnum,
      })
    );
  });
});
