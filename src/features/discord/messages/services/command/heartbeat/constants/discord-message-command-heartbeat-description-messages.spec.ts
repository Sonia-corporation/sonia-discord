import { DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES } from './discord-message-command-heartbeat-description-messages';
import { Messages } from '../../../../classes/messages';
import { DiscordMessageCommandHeartbeatDescriptionEnum } from '../../../../enums/commands/heartbeat/discord-message-command-heartbeat-description.enum';

describe(`DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES`, (): void => {
  it(`should be the Discord message command heartbeat descriptions`, (): void => {
    expect.assertions(1);

    expect(DISCORD_MESSAGE_COMMAND_HEARTBEAT_DESCRIPTION_MESSAGES).toStrictEqual(
      new Messages<DiscordMessageCommandHeartbeatDescriptionEnum>({
        defaultMessage: DiscordMessageCommandHeartbeatDescriptionEnum.IS_IT_GOOD,
        messages: DiscordMessageCommandHeartbeatDescriptionEnum,
      })
    );
  });
});
