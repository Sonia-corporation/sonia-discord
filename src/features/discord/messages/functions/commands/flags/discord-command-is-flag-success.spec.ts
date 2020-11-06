import { createMock } from "ts-auto-mock";
import { DiscordCommandFlagSuccessTitleEnum } from "../../../enums/commands/flags/discord-command-flag-success-title.enum";
import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IDiscordCommandFlagResponse } from "../../../types/commands/flags/discord-command-flag-response";
import { discordCommandIsFlagSuccess } from "./discord-command-is-flag-success";

describe(`discordCommandIsFlagSuccess()`, (): void => {
  let value: IDiscordCommandFlagResponse;

  describe(`when the given value is a Discord message response`, (): void => {
    beforeEach((): void => {
      value = createMock<IDiscordMessageResponse>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsFlagSuccess(value);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a Discord command flag success`, (): void => {
    beforeEach((): void => {
      value = createMock<IDiscordCommandFlagSuccess>({
        description: ``,
        name: DiscordCommandFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsFlagSuccess(value);

      expect(result).toStrictEqual(true);
    });
  });
});
