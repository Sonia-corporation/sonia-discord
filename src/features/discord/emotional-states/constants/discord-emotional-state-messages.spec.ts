import { Messages } from "../../messages/classes/messages";
import { DiscordSoniaEmotionalStateEnum } from "../enums/discord-sonia-emotional-state.enum";
import { DISCORD_EMOTIONAL_STATE_MESSAGES } from "./discord-emotional-state-messages";

describe(`DISCORD_EMOTIONAL_STATE_MESSAGES`, (): void => {
  it(`should be a messages of Discord Sonia emotional states`, (): void => {
    expect.assertions(1);

    expect(DISCORD_EMOTIONAL_STATE_MESSAGES).toStrictEqual(
      new Messages<DiscordSoniaEmotionalStateEnum>({
        defaultMessage: DiscordSoniaEmotionalStateEnum.CRAZY,
        messages: DiscordSoniaEmotionalStateEnum,
      })
    );
  });
});
